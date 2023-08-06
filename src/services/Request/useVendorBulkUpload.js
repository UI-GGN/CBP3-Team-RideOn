import { useAxios } from "../../contexts/axios-context";
import { APIStatus } from "../../reducers/api-reducer";

export const useVendorBulkUpload = () => {
  const axiosInstance = useAxios();

  const bulkUploadVendor = async (payload) => {
    try {
      await axiosInstance.post("/vendors/bulk", payload, {"Content-Type": "multipart/form-data"});
      return APIStatus.SUCCESS;
    } catch (e) {
      return APIStatus.FAILED;
    }
  };

  return { bulkUploadVendor };
};
