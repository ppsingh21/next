import React, { Fragment, useContext, useEffect } from 'react';
import moment from 'moment';
import { todayAllOrders } from './Action';
import Link from 'next/link';
import { DashboardContext } from './dashboardContext';

const SellTable = () => {
  const context = useContext(DashboardContext);

  // Ensure the useEffect hook is always called unconditionally
  useEffect(() => {
    if (context) {
      todayAllOrders(context.dispatch);
    }
  }, [context]);

  if (!context) return null; // Handle the case where context is undefined

  const { data } = context;

  const ordersList = () => {
    let newList: any[] = [];
    if (data.totalOrders.Orders.length > 0) {
      data.totalOrders.Orders.forEach(function (elem: any) {
        if (moment(elem.createdAt).format('LL') === moment().format('LL')) {
          newList = [...newList, elem];
        }
      });
    }
    return newList;
  };

  return (
    <Fragment>
      <div className="col-span-1 overflow-auto bg-white shadow-lg p-4">
        <div className="text-2xl font-semibold mb-6 text-center">
          Today&apos;s Orders{' '}
          {data.totalOrders.Orders.length > 0 ? ordersList().length : 0}
        </div>
        <table className="table-auto border w-full my-2">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Product</th>
              <th className="px-4 py-2 border">Booking</th>
              <th className="px-4 py-2 border">Phone</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Ordered at</th>
            </tr>
          </thead>
          <tbody>
            {data.totalOrders.Orders.length > 0 ? (
              ordersList().map((item, key) => (
                <TodayOrderTable order={item} key={key} />
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="text-xl text-center font-semibold py-8"
                >
                  No orders found today
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="text-sm text-gray-600 mt-2">
          Total{' '}
          {data.totalOrders.Orders.length > 0 ? ordersList().length : 0}{' '}
          orders found
        </div>
        <div className="flex justify-center">
          <Link
            href={'/admin/dashboard/orders'}
            style={{ background: '#303031' }}
            className="cursor-pointer px-4 py-2 text-white rounded-full"
          >
            View All
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

interface TodayOrderTableProps {
  order: any;
}

const TodayOrderTable: React.FC<TodayOrderTableProps> = ({ order }) => {
  return (
    <Fragment>
      <tr>
        <td className="hover:bg-gray-200 text-center p-2">
          {order.transactionId.substring(0, 20) + '.....'}
        </td>
        <td className="p-2 text-center">{order.booking}</td>
        <td className="p-2 text-center">{order.phone}</td>
        <td className="p-2 text-center">{order.address}</td>
        <td className="p-2 text-center">
          {moment(order.createdAt).format('lll')}
        </td>
      </tr>
    </Fragment>
  );
};

const TodaySell = () => {
  return (
    <div className="m-4">
      <SellTable />
    </div>
  );
};

export default TodaySell;
