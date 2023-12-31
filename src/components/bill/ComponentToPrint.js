import React from 'react';
import './style.css';
import formatPrice from '../bodyRight/FormatPrice';

class ComponentToPrint extends React.PureComponent {
    render() {
        const { billItems, tableName } = this.props;
        const currentDate = new Date();
        const options = { day: "numeric", month: "numeric", year: "numeric", hour: "numeric", minute: "numeric" };
        const formattedDate = currentDate.toLocaleDateString("en-GB", options);
        const getTotalAmount = () => {
            return billItems.reduce((total, item) => total + item.price * item.quantity, 0);
        };

        return (
            <div className='p-container' style={{ marginTop: "25%" }}>
                <div className='p-order'>
                    <div className='p-order-head'>
                        <h1 >SUNRISE COFFEE SHOP</h1>
                        <p>28 Nguyễn Tri Phương</p>
                        <p>0399 578 134</p>
                        <h1>HÓA ĐƠN THANH TOÁN</h1>
                    </div>
                    <div className='p-order-main'>
                        <div className='d-flex'>
                            <h3 className='p-highlight'>{tableName}</h3>
                            <h3><span className='p-highlight'>Ngày: </span>{formattedDate}</h3>
                        </div>
                        <table className='p-tb-order'>
                            <thead>
                                <tr>
                                    <th style={{ width: "5%" }}>#</th>
                                    <th style={{ width: "45%" }}>Tên món</th>
                                    <th style={{ width: "15%" }}>Số lượng</th>
                                    <th style={{ width: "15%" }}>Đơn giá</th>
                                    <th style={{ width: "20%" }}>Thành tiền</th>
                                </tr>
                            </thead>
                            <tbody>
                                {billItems.map((item, index) => (
                                    <tr key={index}>
                                        <td className='align-center'>{index + 1}</td>
                                        <td>{item.title}</td>
                                        <td className='align-center'>{item.quantity}</td>
                                        <td className='align-right'>{formatPrice(item.price)}</td>
                                        <td className='align-right'>{formatPrice(item.amount)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className='p-order-row-sumary'>
                            <h2>Tổng thanh toán</h2>
                            <h2>{formatPrice(getTotalAmount())}</h2>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default ComponentToPrint;