import { Link, useNavigate } from "react-router-dom";
import { useSalesData } from "../../hooks/useSalesData";
import './sales.css'

function Sales() {
    const { sales, isLoading } = useSalesData();
    const navigate = useNavigate();

// Ordena as vendas em ordem decrescente de data
const sortedSales = sales?.sort((a, b) => {
    const dateA = new Date(a.checkoutDateTime).getTime();
    const dateB = new Date(b.checkoutDateTime).getTime();
    return dateB - dateA;
  });
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };


  return (
    <div className="container">
    <div className="nav">
      <h2>Ecommerce</h2>
      <a>
        <Link to="/api/products">Products</Link>
        <Link to="/api/sales">Sales</Link>
      <button  onClick={handleLogout}>Logout</button>
      </a>
      
    </div>
      <h2>Sales</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>Phone Number</th>
              <th>Street</th>
              <th>City</th>
              <th>State</th>
              <th>Postal Code</th>
              <th>Checkout Date</th>
              <th>Items</th>
            </tr>
          </thead>
          <tbody>
            {sortedSales?.map((sale) => (
              <tr key={sale.id}>
                <td>{sale.id}</td>
                <td>{sale.fullName}</td>
                <td>{sale.phoneNumber}</td>
                <td>{sale.street}</td>
                <td>{sale.city}</td>
                <td>{sale.state}</td>
                <td>{sale.postalCode}</td>
                <td>{sale.checkoutDateTime}</td>
                <td>
                  <ul>
                    {sale.items.map((item) => (
                      <li key={item.productId}>
                        {item.productName} / QTN= {item.quantity} / P= {item.price}
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>

  );
}

export default Sales;