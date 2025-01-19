import Header from '../components/Header.jsx';

function CartView() {
    return (
        <div>
            <Header/>
            <div className="row" style={{marginBottom: "20px"}}>
                <div className="col-xl-1" style={{marginLeft: "5px"}}>
                    <img width="100" height="80" style={{height: "150px"}}/>
                </div>
                <div className="col-xl-9">
                    <h1>Heading</h1>
                    <p>Paragraph</p>
                </div>
                <div className="col">
                    <p style={{textAlign: "right", marginRight: "25px"}}>Remove</p>
                </div>
            </div>

            <div className="row" style={{marginBottom: "20px"}}>
                <div className="col-xl-1" style={{marginLeft: "5px"}}>
                    <img width="100" height="80" style={{height: "150px"}}/>
                </div>
                <div className="col-xl-9">
                    <h1>Heading</h1>
                    <p>Paragraph</p>
                </div>
                <div className="col">
                    <p style={{textAlign: "right", marginRight: "25px"}}>Remove</p>
                </div>
            </div>
        </div>
    )
}

export default CartView;