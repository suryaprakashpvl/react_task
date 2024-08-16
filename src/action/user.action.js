import axiosCtrl from "../action/axios.action"

export const UserRegister = async (payload) => {
    try {
      let respData = await axiosCtrl({
        method: "post",
        url: `/user_register`,
        data: payload,
      });
  
      return {
        status: respData.data.status,
        message: respData.data.message,
      };
    } catch (err) {
        console.log(err,err.response.data.error,"err");
        
      return {
        status: false,
        error: err.response.data.error,
      };
    }
  };

  export const UserLogin = async (payload) => {
    try {
      let respData = await axiosCtrl({
        method: "post",
        url: `/user_login`,
        data: payload,
      });
  
      return {
        status: respData.data.status,
        message: respData.data.message,
        token:respData.data.token,
      };
    } catch (err) {
        console.log(err,err.response.data,"err");
        
      return {
        status: false,
        error: err.response.data.message,
      };
    }
  };
  
  export const getProduct = async () => {
    try {
      let respData = await axiosCtrl({
        method: "get",
        url: `/product`,
      });

      return {
        status: respData.data.status,
        message: respData.data.message,
        result:respData.data.result,
      };
    } catch (err) {
      return {
        status: false,
        error: err.response.data.message,
      };
    }
  };

  
  export const AddProduct = async (payload) => {
    try {
      let respData = await axiosCtrl({
        method: "post",
        url: `/product`,
        data:payload
      });

      return {
        status: respData.data.status,
        message: respData.data.message,
        result:respData.data.result,
      };
    } catch (err) {
      return {
        status: false,
        error: err.response.data.message,
      };
    }
  };

  export const DeleteProduct = async (payload) => {
    try {
      let respData = await axiosCtrl({
        method: "delete",
        url: `/product`,
        data:payload
      });

      return {
        status: respData.data.status,
        message: respData.data.message,
      };
    } catch (err) {
      return {
        status: false,
        error: err.response.data.message,
      };
    }
  };

  export const UpdateProduct = async (payload) => {
    try {
      let respData = await axiosCtrl({
        method: "put",
        url: `/product`,
        data:payload
      });

      return {
        status: respData.data.status,
        message: respData.data.message,
      };
    } catch (err) {
      console.log(err,"error");
      
      return {
        status: false,
        error: err.response.data.error,
      };
    }
  };