import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  restaurantName: z.string({
    required_error: "Restaurant name is required!",
  }),
  city: z.string({
    required_error: "City is required!",
  }),
  country: z.string({
    required_error: "Country is required!",
  }),
  deliveryPrice: z.coerce.number({
    required_error: "Delivery price is required!",
    invalid_type_error: " Delivery price must be a valid number!",
  }),

  estimatedDeliveryTime: z.coerce.number({
    required_error: "Estimated delivery time is required!",
    invalid_type_error: "Estimated delivery time must be a valid number!",
  }),
  cuisines: z.array(z.string()).nonempty({
    message: "Select at least one item!",
  }),
  menuItems: z.array(
    z.object({
      name: z.string().min(1, "Name is required!"),
      price: z.coerce.number().min(1, "Price is required!"),
    })
  ),
  imageFile: z.instanceof(File, { message: "Image is required!" }),
});

type restaurantFormData = z.infer<typeof formSchema>;

type Props = {
  onSave: (restaurantFormData: FormData) => void;
  isLoading: boolean;
};

const ManageRestaurantForm = ({ onSave, isLoading }: Props) => {
  const form = useForm<restaurantFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cuisines: [],
      menuItems: [{ name: "", price: 0 }],
    },
  });

  return <Form></Form>;
};

export default ManageRestaurantForm;
