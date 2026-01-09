import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useProductDetails from '../../hooks/useProductDetails';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { Alert, Box, Button, Card, CardContent, Chip, CircularProgress, Divider, Rating, Stack, Typography } from '@mui/material';
import useFetch from '../../hooks/useFetch';
import useAddToCart from '../../hooks/useAddToCart';

export default function ProductDetails() {
  const {id} = useParams();
  const {isError, isLoading, data} = useProductDetails(id);
  const [selectedImage, setSelectedImage] = useState('');
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)
  const {mutate: addToCart, isPending} = useAddToCart();

  // console.log(data);
  const product = data?.response;
  // console.log(product);
  useEffect(()=>{
    setSelectedImage(product?.image);
  },[product]);
    if (isLoading) {
      return <CircularProgress />
    }
    if (isError) {
      return <Alert severity='error'>Error in fetching data</Alert>
    }

   return (
    <Box className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <Box className="max-w-7xl mx-auto">


        <Box className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left: Images Section */}
          <Box>
            <Card className="shadow-2xl rounded-2xl overflow-hidden sticky top-4">
              <CardContent className="p-0">
                {/* Main Image */}
                <Box className="w-full h-96 md:h-96 bg-white flex items-center justify-center overflow-hidden">
                  <img
                    src={selectedImage}
                    alt={product.name}
                    className="w-full h-full object-contain hover:scale-110 transition-transform duration-300"
                  />
                </Box>

                {/* Thumbnail Gallery */}
                <Box className="p-4 bg-white flex gap-3 overflow-x-auto">
                  <Box
                    onClick={() => setSelectedImage(product.image)}
                    className={`min-w-24 h-24 border-2 rounded-lg cursor-pointer flex items-center justify-center overflow-hidden transition-all ${selectedImage === product.thumbnail ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                      }`}
                  >
                    <img src={product.image} alt="thumb" className="w-full h-full object-cover" />
                  </Box>
                  {product.subImages?.map((img, idx) => (
                    <Box
                      key={idx}
                      onClick={() => setSelectedImage(img)}
                      className={`min-w-24 h-24 border-2 rounded-lg cursor-pointer flex items-center justify-center overflow-hidden transition-all ${selectedImage === img ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                        }`}
                    >
                      <img src={img} alt={`img-${idx}`} className="w-full h-full object-cover" />
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Box>

          {/* Right: Product Info Section */}
          <Box className="space-y-6">

            {/* Title & Brand */}
            <Box>
              {/* <Box className="flex items-center gap-2 mb-2">
                <Chip
                  icon={<VerifiedIcon className="text-blue-500" />}
                  label={product.brand}
                  variant="outlined"
                  color="primary"
                />
                <Chip label={product.category} variant="outlined" />
              </Box> */}
              <Typography variant="h4" className="font-bold text-gray-900 leading-tight">
                {product.name}
              </Typography>
            </Box>

            {/* Rating & Reviews */}
            <Box className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-md">
              <Box className="flex items-center gap-1">
                <Rating value={product.rate} readOnly size="large" />
                <Typography variant="body2" className="ml-2 font-semibold text-gray-700">
                  {product.rate}/5
                </Typography>
              </Box>
              <Divider orientation="vertical" flexItem />
              <Typography variant="body2" className="text-gray-600">
                {product.reviews?.length || 0} reviews
              </Typography>
            </Box>

            {/* Price Section */}
            <Card className="bg-linear-to-r from-blue-500 to-indigo-600 text-white shadow-lg">
              <CardContent>
                <Typography variant="body2" className="opacity-90 mb-2">
                  Special Price
                </Typography>
                <Box className="flex items-center gap-3 mb-3">
                  <Typography variant="h3" className="font-bold">
                    ${product.price}
                  </Typography>
                  <Chip
                    label={`Save ${Math.round(product.price * 0.2)}$`}
                    className="bg-white/20"
                    size="small"
                  />
                </Box>
                <Typography variant="body2" className="opacity-90">
                  Stock: <span className={`font-bold ${product.quantity > 0 ? 'text-green-300' : 'text-red-300'}`}>
                    {product.quantity > 0 ? `${product.quantity} Available` : 'Out of Stock'}
                  </span>
                </Typography>
              </CardContent>
            </Card>

            {/* Description */}
            <Box className="bg-white p-4 rounded-xl shadow-md">
              <Typography variant="h6" className="font-bold mb-2">
                Description
              </Typography>
              <Typography variant="body2" className="text-gray-700 leading-relaxed">
                {product.description}
              </Typography>
            </Box>

            {/* Quantity & Actions */}
            <Box className="bg-white p-4 rounded-xl shadow-md space-y-4">
              <Box className="flex items-center gap-4">
                <Typography className="font-semibold">Quantity:</Typography>
                <Box className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-12 text-center border-0 focus:outline-none"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                  >
                    +
                  </button>
                </Box>
              </Box>

              {/* Action Buttons */}
              <Stack direction="row" spacing={2}>
                <Button
                onClick={()=> addToCart({productId: product.id, Count: quantity})}
                  variant="contained"
                  size="large"
                  startIcon={isPending? null : <ShoppingCartIcon />}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                  disabled={isPending}
                >
                  {isPending ? <CircularProgress size={20} color='primary' /> : 'Add to Cart'}
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="px-6"
                >
                  {isFavorite ? <FavoriteIcon className="text-red-500" /> : <FavoriteBorderIcon />}
                </Button>
              </Stack>
            </Box>

            {/* Shipping & Warranty Info */}
            {/* <Box className="grid grid-cols-2 gap-3">
              <Card className="bg-linear-to-br from-green-50 to-emerald-50">
                <CardContent className="text-center">
                  <LocalShippingIcon className="text-green-600 mx-auto mb-2" sx={{ fontSize: 32 }} />
                  <Typography variant="body2" className="font-semibold text-gray-900 mb-1">
                    Free Shipping
                  </Typography>
                  <Typography variant="caption" className="text-gray-600">
                    {product.shippingInformation || 'On orders above $50'}
                  </Typography>
                </CardContent>
              </Card>

              <Card className="bg-linear-to-br from-purple-50 to-pink-50">
                <CardContent className="text-center">
                  <VerifiedIcon className="text-purple-600 mx-auto mb-2" sx={{ fontSize: 32 }} />
                  <Typography variant="body2" className="font-semibold text-gray-900 mb-1">
                    Warranty
                  </Typography>
                  <Typography variant="caption" className="text-gray-600">
                    {product.warranty || '1 Year Warranty'}
                  </Typography>
                </CardContent>
              </Card>
            </Box> */}
          </Box>
        </Box>

        {/* Reviews Section */}
        <Box className="mt-12 bg-white rounded-2xl shadow-lg p-6">
          <Typography variant="h5" className="font-bold mb-6">
            Customer Reviews ({product.reviews?.length || 0})
          </Typography>

          {product.reviews && product.reviews.length > 0 ? (
            <Stack spacing={4}>
              {product.reviews.slice(0, 5).map((review, idx) => (
                <Box key={idx} className="pb-4 border-b border-gray-200 last:border-b-0">
                  <Box className="flex items-center gap-3 mb-2">
                    <Avatar sx={{ width: 40, height: 40, bgcolor: 'primary.main' }}>
                      {review.reviewerName.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography variant="body2" className="font-semibold">
                        {review.reviewerName}
                      </Typography>
                      <Box className="flex items-center gap-2">
                        <Rating value={review.rating} readOnly size="small" />
                        <Typography variant="caption" className="text-gray-500">
                          {review.rating}/5
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Typography variant="body2" className="text-gray-700">
                    {review.comment}
                  </Typography>
                </Box>
              ))}
            </Stack>
          ) : (
            <Typography variant="body2" className="text-gray-500 text-center py-8">
              No reviews yet
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  )
}
