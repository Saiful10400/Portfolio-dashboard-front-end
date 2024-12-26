import { useAppdispatch } from "@/redux/featcher/hoocks";
import { switchLoading } from "@/redux/slice/authSlice";

 

const useSendPost = (fn) => {
  const dispatch = useAppdispatch();
  const [send] = fn();

  const startLoading = () => {
    dispatch(switchLoading());
  };

  return [send, startLoading];
};

export default useSendPost;
