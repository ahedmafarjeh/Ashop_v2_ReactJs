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
  const {
    control,
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      search: "",
      categoryId: "",
      minPrice: "",
      maxPrice: "",
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
    };
    reset(empty);
    onSubmit(empty);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(submitHandler)}
      sx={{ mb: 3 }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        alignItems="center"
      >
        {/* Search */}
        <Controller
          name="search"
          control={control}
          render={({ field }) => (
            <TextField {...field} label="Search" fullWidth />
          )}
        />

        {/* Category */}
        <FormControl sx={{ minWidth: 200 }}>
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
            <TextField
              {...field}
              label="Min Price"
              type="number"
              sx={{ width: 140 }}
            />
          )}
        />

        {/* Max Price */}
        <Controller
          name="maxPrice"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Max Price"
              type="number"
              sx={{ width: 140 }}
            />
          )}
        />

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
