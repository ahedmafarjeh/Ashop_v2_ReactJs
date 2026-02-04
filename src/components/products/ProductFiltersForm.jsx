// 

import {
  Box,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  Stack,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";

export default function ProductFiltersForm({
  categories = [],
  onSubmit,
}) {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      search: "",
      categoryId: "",
      minPrice: "",
      maxPrice: "",
      sortBy: "",
      ascending: true,
    },
  });

  const submitHandler = (data) => {
    onSubmit(data);
  };

  const resetHandler = () => {
    const empty = {
      search: "",
      categoryId: "",
      minPrice: "",
      maxPrice: "",
      sortBy: "",
      ascending: true,
    };
    reset(empty);
    onSubmit(empty);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(submitHandler)} sx={{ mb: 3 }}>
      <Box sx={{mb:2}}>
        {/* Search */}
        <Controller
          name="search"
          control={control}
          render={({ field }) => (
            <TextField {...field} label="Search" fullWidth />
          )}
        />
      </Box>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        alignItems="center"
        flexWrap="wrap"
      >

        {/* Category */}
        <FormControl sx={{ minWidth: 180 }}>
          <InputLabel>Category</InputLabel>
          <Controller
            name="categoryId"
            control={control}
            render={({ field }) => (
              <Select {...field} label="Category">
                <MenuItem value="">All</MenuItem>
                {categories.map((cat) => (
                  <MenuItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>

        {/* Min Price */}
        <Controller
          name="minPrice"
          control={control}
          render={({ field }) => (
            <TextField {...field} label="Min Price" type="number" sx={{ width: 130 }} />
          )}
        />

        {/* Max Price */}
        <Controller
          name="maxPrice"
          control={control}
          render={({ field }) => (
            <TextField {...field} label="Max Price" type="number" sx={{ width: 130 }} />
          )}
        />

        {/* Sort By */}
        <FormControl sx={{ minWidth: 160 }}>
          <InputLabel>Sort By</InputLabel>
          <Controller
            name="sortBy"
            control={control}
            render={({ field }) => (
              <Select {...field} label="Sort By">
                <MenuItem value="">None</MenuItem>
                <MenuItem value="price">Price</MenuItem>
                <MenuItem value="name">Name</MenuItem>
              </Select>
            )}
          />
        </FormControl>

        {/* Ascending / Descending */}
        <FormControl sx={{ minWidth: 160 }}>
          <InputLabel>Order</InputLabel>
          <Controller
            name="ascending"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                label="Order"
                onChange={(e) => field.onChange(e.target.value === "true")}
                value={String(field.value)}
              >
                <MenuItem value="true">Ascending</MenuItem>
                <MenuItem value="false">Descending</MenuItem>
              </Select>
            )}
          />
        </FormControl>

        <Button type="submit" variant="contained">
          Apply
        </Button>

        <Button variant="outlined" color="error" onClick={resetHandler}>
          Reset
        </Button>
      </Stack>
    </Box>
  );
}