import { useContext, useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { AuthContext } from '../../providers/AuthProvider';

const Earnings = () => {
  const { yearlyEarnings } = useContext(AuthContext);

  // Convert data to chart/table-friendly format
  const formattedEarnings = useMemo(() => {
    if (!Array.isArray(yearlyEarnings)) return [];
  
    return yearlyEarnings.map(item => ({
      year: item.year,
      "Amount Earned": item.amount
    }));
  }, [yearlyEarnings]);
  
  const formatCurrency = (value) => {
    return value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).replace('$', '');
  };

  // Custom tooltip for better mobile experience
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 sm:p-3 border border-gray-300 rounded shadow-lg">
          <p className="text-xs sm:text-sm font-semibold">{`Year: ${payload[0].payload.year}`}</p>
          <p className="text-xs sm:text-sm text-blue-600">
            {`Earnings: $${payload[0].value.toLocaleString()}`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-10">
      {/* Chart Section */}
      <div className="mb-8 md:mb-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 md:mb-6 gap-2">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold uppercase">
            Yearly Earnings <span className="font-bold">Chart</span>
          </h3>
        </div>

        {/* Chart */}
        {formattedEarnings.length > 0 ? (
          <div className="bg-white p-3 sm:p-4 md:p-6 rounded-lg shadow-md">
            <ResponsiveContainer width="100%" height={250} className="sm:hidden">
              <BarChart
                data={formattedEarnings}
                margin={{ top: 5, right: 10, left: -20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis 
                  dataKey="year" 
                  tick={{ fontSize: 11 }}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis
                  tick={{ fontSize: 11 }}
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                  width={45}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="Amount Earned" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>

            <ResponsiveContainer width="100%" height={300} className="hidden sm:block md:hidden">
              <BarChart
                data={formattedEarnings}
                margin={{ top: 10, right: 20, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis 
                  dataKey="year" 
                  tick={{ fontSize: 12 }}
                />
                <YAxis
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) =>
                    `$${value.toLocaleString(undefined, {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    })}`
                  }
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: '14px' }} />
                <Bar dataKey="Amount Earned" fill="#3b82f6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>

            <ResponsiveContainer width="100%" height={350} className="hidden md:block">
              <BarChart
                data={formattedEarnings}
                margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis 
                  dataKey="year" 
                  tick={{ fontSize: 14 }}
                />
                <YAxis
                  tick={{ fontSize: 14 }}
                  tickFormatter={(value) =>
                    `$${value.toLocaleString(undefined, {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    })}`
                  }
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: '14px' }} />
                <Bar dataKey="Amount Earned" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="bg-gray-50 p-6 md:p-8 rounded-lg text-center">
            <p className="text-gray-500 text-sm md:text-base">No earnings data available</p>
          </div>
        )}
      </div>

      {/* Table Section */}
      <div className="mb-8">
        {/* Table Header */}
        <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold uppercase text-center mb-4 md:mb-6">
          Yearly Earnings <span className="font-bold">Table</span>
        </h3>

        {/* Table Container with Horizontal Scroll on Mobile */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[300px] border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-blue-50 to-blue-100">
                  <th className="border border-gray-300 py-2 sm:py-3 md:py-4 px-3 sm:px-4 md:px-6 text-left text-xs sm:text-sm md:text-base font-semibold text-gray-700">
                    Year
                  </th>
                  <th className="border border-gray-300 py-2 sm:py-3 md:py-4 px-3 sm:px-4 md:px-6 text-right text-xs sm:text-sm md:text-base font-semibold text-gray-700">
                    Earnings
                  </th>
                </tr>
              </thead>
              <tbody>
                {formattedEarnings.length > 0 ? (
                  formattedEarnings.map((entry, index) => (
                    <tr 
                      key={entry.year}
                      className={`hover:bg-blue-50 transition-colors ${
                        index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                      }`}
                    >
                      <td className="border border-gray-300 py-2 sm:py-3 md:py-4 px-3 sm:px-4 md:px-6 text-left text-xs sm:text-sm md:text-base font-medium text-gray-800">
                        {entry.year}
                      </td>
                      <td className="border border-gray-300 py-2 sm:py-3 md:py-4 px-3 sm:px-4 md:px-6 text-right text-xs sm:text-sm md:text-base font-semibold text-blue-600">
                        ${formatCurrency(entry["Amount Earned"])}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td 
                      colSpan="2" 
                      className="border border-gray-300 py-6 md:py-8 text-center text-gray-500 text-sm md:text-base"
                    >
                      No earnings data available
                    </td>
                  </tr>
                )}
              </tbody>
              {formattedEarnings.length > 0 && (
                <tfoot>
                  <tr className="bg-gradient-to-r from-blue-100 to-blue-200 font-bold">
                    <td className="border border-gray-300 py-2 sm:py-3 md:py-4 px-3 sm:px-4 md:px-6 text-left text-xs sm:text-sm md:text-base text-gray-800">
                      Total
                    </td>
                    <td className="border border-gray-300 py-2 sm:py-3 md:py-4 px-3 sm:px-4 md:px-6 text-right text-xs sm:text-sm md:text-base text-blue-700">
                      ${formatCurrency(
                        formattedEarnings.reduce((sum, entry) => sum + entry["Amount Earned"], 0)
                      )}
                    </td>
                  </tr>
                </tfoot>
              )}
            </table>
          </div>
          
          {/* Mobile scroll hint */}
          {formattedEarnings.length > 0 && (
            <div className="sm:hidden bg-gray-50 px-4 py-2 text-center">
              <p className="text-xs text-gray-500">← Scroll horizontally to view all data →</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Earnings;