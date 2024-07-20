import { Dispatch } from 'react';
import { getAllOrder, deleteOrder } from './FetchApi';

interface Order {
  id: string;
  allProduct: { id: { pName: string; pImages: string[] }; quantity: number }[];
  status: string;
  amount: number;
  transactionId: string;
  booking: string;
  user: { email: string };
  phone: string;
  address: string;
  createdAt: string;
  updatedAt: string;
}

interface GetAllOrdersResponse {
  Orders: Order[];
}

interface DeleteOrderResponse {
  success: boolean;
}

interface OrderAction {
  type: string;
  payload?: any;
  oId?: string;
  status?: string;
}

export const fetchData = async (dispatch: Dispatch<OrderAction>) => {
  dispatch({ type: 'loading', payload: true });
  const responseData: GetAllOrdersResponse | undefined = await getAllOrder();
  setTimeout(() => {
    if (responseData && responseData.Orders) {
      dispatch({
        type: 'fetchOrderAndChangeState',
        payload: responseData.Orders,
      });
    }
    dispatch({ type: 'loading', payload: false });
  }, 1000);
};

export const editOrderReq = (
  oId: string,
  type: boolean,
  status: string,
  dispatch: Dispatch<OrderAction>
) => {
  if (type) {
    dispatch({ type: 'updateOrderModalOpen', oId, status });
  }
};

export const deleteOrderReq = async (
  oId: string,
  dispatch: Dispatch<OrderAction>
) => {
  const responseData: DeleteOrderResponse | undefined = await deleteOrder(oId);
  if (responseData && responseData.success) {
    fetchData(dispatch);
  }
};

export const filterOrder = async (
  type: string,
  data: any,
  dispatch: Dispatch<OrderAction>,
  dropdown: boolean,
  setDropdown: (value: boolean) => void
) => {
  const responseData: GetAllOrdersResponse | undefined = await getAllOrder();
  if (responseData && responseData.Orders) {
    let newData: Order[];
    switch (type) {
      case 'All':
        newData = responseData.Orders;
        break;
      case 'Not processed':
        newData = responseData.Orders.filter(
          (item: Order) => item.status === 'Not processed'
        );
        break;
      case 'Processing':
        newData = responseData.Orders.filter(
          (item: Order) => item.status === 'Processing'
        );
        break;
      case 'Shipped':
        newData = responseData.Orders.filter(
          (item: Order) => item.status === 'Shipped'
        );
        break;
      case 'Delivered':
        newData = responseData.Orders.filter(
          (item: Order) => item.status === 'Delivered'
        );
        break;
      case 'Cancelled':
        newData = responseData.Orders.filter(
          (item: Order) => item.status === 'Cancelled'
        );
        break;
      default:
        newData = responseData.Orders;
    }
    dispatch({ type: 'fetchOrderAndChangeState', payload: newData });
    setDropdown(!dropdown);
  }
};
