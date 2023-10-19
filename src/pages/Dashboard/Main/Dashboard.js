import Layout from "../../../components/Layout";
import { GiMoneyStack, GiTakeMyMoney } from "react-icons/gi";
import { HiOutlineUserGroup } from "react-icons/hi";
import { AiOutlineShop } from "react-icons/ai";
import RecentOrders from "../Orders/RecentOrders";
function Dashboard() {
  const Total_Income = () => {
    return <GiMoneyStack size={27} color="white" />;
  };
  const Daily_Income = () => {
    return <GiTakeMyMoney size={27} color="white" />;
  };
  const All_Users = () => {
    return <HiOutlineUserGroup size={27} color="white" />;
  };
  const All_Shops = () => {
    return <AiOutlineShop size={27} color="white" />;
  };

  const Labels = [
    {
      id: 1,
      title: "Total Income",
      amount: "11,22,345",
      icon: Total_Income,
      background: "bg-black",
    },
    {
      id: 2,
      title: "Daily Income",
      amount: "22,345",
      icon: Daily_Income,
      background: "bg-lime-500",
    },
    {
      id: 3,
      title: "All Users",
      amount: "1,22,345",
      icon: All_Users,
      background: "bg-red-600",
    },
    {
      id: 4,
      title: "All Shops",
      amount: "22,345",
      icon: All_Shops,
      background: "bg-blue-600",
    },
  ];

  return (
    <Layout>
      <div className="">
        <h1 className="text-black font-semibold text-lg mb-3 ">Dashboard</h1>
      </div>
      <div className="grid lg:grid-cols-4 grid-cols-1  gap-4 mb-10">
        {Labels.map(({ id, title, amount, icon: Icon, background }) => (
          <div
            className="bg-[#fff] flex items-center gap-6 p-6 rounded-md break-all  shadow-xl"
            key={id}
          >
            <div className={`${background} p-2 rounded-md`}>
              <Icon />
            </div>
            <div className="">
              <p className="text-black text-base font-medium">{title}</p>
              <p className="font-bold">{amount}</p>
            </div>
          </div>
        ))}
      </div>
      <div>
        <div className="mb-5">
          <h2 className="text-black font-semibold text-base mb-3 ">
            Recent Orders
          </h2>
        </div>
        <div>
          <RecentOrders />
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;
