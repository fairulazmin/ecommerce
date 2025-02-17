import db from "@/prisma/db";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatCurrency, formatNumber } from "@/lib/formatters";

const getSalesData = async () => {
  const salesData = await db.order.aggregate({
    _sum: { pricePaidInCents: true },
    _count: true,
  });
  return {
    amount: (salesData._sum.pricePaidInCents || 0) / 100,
    numberOfSales: salesData._count,
  };
};

const getUserData = async () => {
  const [userCount, orderData] = await Promise.all([
    db.user.count(),
    db.order.aggregate({
      _sum: { pricePaidInCents: true },
    }),
  ]);

  return {
    userCount,
    averageValuePerUser:
      userCount === 0
        ? 0
        : (orderData._sum.pricePaidInCents || 0) / userCount / 100,
  };
};

const getProductData = async () => {
  const [activeCount, inactiveCount] = await Promise.all([
    db.product.count({
      where: { isAvailableForPurchase: true },
    }),
    db.product.count({ where: { isAvailableForPurchase: false } }),
  ]);

  return {
    activeCount,
    inactiveCount,
  };
};

const AdminPage = async () => {
  const [salesData, userData, productData] = await Promise.all([
    getSalesData(),
    getUserData(),
    getProductData(),
  ]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <DashboardCard
        title="Sales"
        description={`${formatNumber(salesData.numberOfSales)} Orders`}
        content={formatCurrency(salesData.amount)}
      />
      <DashboardCard
        title="Customers"
        description={`${formatCurrency(userData.averageValuePerUser)} Average Value`}
        content={formatNumber(userData.userCount)}
      />
      <DashboardCard
        title="Active Products"
        description={`${formatNumber(productData.inactiveCount)} Inactive`}
        content={formatNumber(productData.activeCount)}
      />
    </div>
  );
};

export default AdminPage;

const DashboardCard = ({
  title,
  description,
  content,
}: {
  title: string;
  description: string;
  content: string;
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{content}</p>
      </CardContent>
    </Card>
  );
};
