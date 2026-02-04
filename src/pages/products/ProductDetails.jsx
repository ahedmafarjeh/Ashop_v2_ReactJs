import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useProductDetails from '../../hooks/useProductDetails';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { Alert, Avatar, Box, Button, Card, CardContent, Chip, CircularProgress, Divider, Paper, Rating, Stack, TextField, Typography } from '@mui/material';
import useAddToCart from '../../hooks/useAddToCart';
import useProfile from '../../hooks/useProfile';
import useAddReview from '../../hooks/useAddReview';
import { Controller, useForm } from 'react-hook-form';

export default function ProductDetails() {
  const { id } = useParams();
  const { isError, isLoading, data } = useProductDetails(id);
  const { isError: isProfileError, isLoading: isProfileLoading, data: profileData } = useProfile();
  const { mutate: addReview, isPending: isReviewPending, isError: isReviewError, error: reviewError } = useAddReview();
  const [selectedImage, setSelectedImage] = useState('');
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)
  const { mutate: addToCart, isPending } = useAddToCart();
  const { control, handleSubmit, register, reset, } = useForm({
    defaultValues: {
      rating: 0,
      comment: ''
    }
  });

  const [userRating, setUserRating] = useState(null);
  const [comment, setComment] = useState('');
  console.log(profileData);
  const product = data?.response;
  // console.log(product);
  const handleSubmitReview = (formData) => {
    addReview({
      productId: product.id,
      rating: formData.rating,
      comment: formData.comment
    });
  }
  useEffect(() => {
    setSelectedImage(product?.image);
  }, [product]);
  if (isLoading) {
    return <CircularProgress />
  }
  if (isError) {
    return <Alert severity='error'>Error in fetching data</Alert>
  }

  return (
    <Box className="min-h-screen  py-8 px-4">
      <Box className="max-w-7xl mx-auto">


        <Box className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left: Images Section */}
          <Box>
            <Card className="shadow-2xl rounded-2xl overflow-hidden sticky top-4">
              <CardContent className="p-0">
                {/* Main Image */}
                <Box className="w-full h-96 md:h-96  flex items-center justify-center overflow-hidden">
                  <img
                    src={selectedImage}
                    alt={product.name}
                    className="w-full h-full object-contain hover:scale-110 transition-transform duration-300"
                  />
                </Box>

                {/* Thumbnail Gallery */}
                <Box className="p-4  flex gap-3 overflow-x-auto">
                  <Box
                    onClick={() => setSelectedImage(product.image)}
                    className={`min-w-24 h-24 border-2 rounded-lg cursor-pointer flex items-center justify-center overflow-hidden transition-all ${selectedImage === product.thumbnail ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                      }`}
                  >
                    <img src={product.image} alt="thumb" className="w-full h-full object-cover" />
                  </Box >
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
              <Typography variant="h4" >
                {product.name}
              </Typography>
            </Box>

            {/* Rating & Reviews */}
            <Paper className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-md">
              <Box className="flex items-center gap-1">
                <Rating value={product.rate} readOnly size="large" />
                <Typography variant="body2" className="ml-2 font-semibold ">
                  {product.rate}/5
                </Typography>
              </Box>
              <Divider orientation="vertical" flexItem />
              <Typography variant="body2" >
                {product.reviews?.length || 0} reviews
              </Typography>
            </Paper>

            {/* Price Section */}
            <Card >
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
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6">
                Description
              </Typography>
              <Typography variant="body2" className="opacity-90">
                {product.description}
              </Typography>
            </Paper>

            {/* Quantity & Actions */}
            <Paper className="bg-white p-4 rounded-xl shadow-md space-y-4">


              {/* Action Buttons */}
              <Stack direction="row" spacing={2}>
                <Button
                  onClick={() => addToCart({ productId: product.id, Count: quantity })}
                  variant="contained"
                  size="large"
                  startIcon={isPending ? null : <ShoppingCartIcon />}
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
            </Paper>

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

        {/* Add Review Section */}
        {isReviewError && <Alert severity='error' className="mt-6">{reviewError?.response?.data?.message || 'Failed to submit review'}</Alert>}
        <Paper component="form" onSubmit={handleSubmit(handleSubmitReview)} className="mb-8 mt-3 p-6 rounded-2xl shadow-md">
          <Typography variant="h6" className="mb-4 font-semibold">
            Add Your Review
          </Typography>

          <Stack spacing={3}>
            <Box>
              <Typography variant="body2" className="mb-1">
                Your Rating
              </Typography>
              <Controller
                name="rating"
                control={control}
                rules={{
                  required: 'Rating is required',
                  min: { value: 1, message: 'Rating must be at least 1' }
                }}
                render={({ field }) => (
                  <Rating
                    {...field}
                    size="large"
                    value={field.value}
                    onChange={(_, value) => field.onChange(value)}
                  />
                )}
              />
            </Box>

            <TextField
              multiline
              rows={4}
              placeholder="Write your experience with this product..."
              fullWidth
              {...register("comment")}
            />

            <Button
            type='submit'
              variant="contained"
              size="large"
              className="self-end bg-blue-600 hover:bg-blue-700"
              // onClick={handleSubmitReview}
              disabled={ isReviewPending}
            >
              {isReviewPending ? <CircularProgress size={20} color='inherit' /> : 'Submit Review'}
            </Button>
          </Stack>
        </Paper>



        {/* Reviews Section */}
        <Box sx={{ bgcolor: "background.paper" }} className="mt-12  rounded-2xl shadow-lg p-6">
          <Typography variant="h5" className="font-bold mb-6">
            Customer Reviews ({product.reviews?.length || 0})
          </Typography>

          {product.reviews && product.reviews.length > 0 ? (
            <Stack spacing={4}>
              {product.reviews.slice(0, 5).map((review, idx) => (
                <Box key={idx} className="pb-4 border-b border-gray-200 last:border-b-0">
                  <Box className="flex items-center gap-3 mb-2">
                    <Avatar sx={{ width: 40, height: 40, bgcolor: 'primary.main' }}>
                      {review?.reviewerName?.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography variant="body2" className="font-semibold">
                        {review.reviewerName}
                      </Typography>
                      <Box className="flex items-center gap-2">
                        <Rating value={review.rating} readOnly size="small" />
                        <Typography variant="caption" >
                          {review.rating}/5
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Typography variant="body2" >
                    {review.comment}
                  </Typography>
                </Box>
              ))}
            </Stack>
          ) : (
            <Typography variant="body2" className=" text-center py-8">
              No reviews yet
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  )
}
