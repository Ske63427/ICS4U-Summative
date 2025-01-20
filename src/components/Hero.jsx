function Hero(){
    return (
        <section>
        <div style={{height: "600px", background: "url(./src/assets/heroImage.jpg) center / cover"}}></div>
        <div className="container h-100 position-relative" style={{top: "-50px"}}>
            <div className="row gy-5 gy-lg-0 row-cols-1 row-cols-md-2 row-cols-lg-3">
                <div className="col">
                    <div className="card h-100">
                        <div className="card-body d-flex flex-column justify-content-between p-4">
                            <div>
                                <h6 className="text-uppercase text-muted">Budget</h6>
                                <h4 className="display-6 fw-bold">$6.99/month</h4>
                                <hr/>
                                <ul className="list-unstyled">
                                    <li className="d-flex mb-2">
                                        <span className="bs-icon-xs bs-icon-rounded bs-icon-primary-light bs-icon me-2"></span>
                                        <span>2 Devices</span>
                                    </li>
                                    <li className="d-flex mb-2">
                                        <span className="bs-icon-xs bs-icon-rounded bs-icon-primary-light bs-icon me-2"></span>
                                        <span>1080p</span>
                                    </li>
                                    <li className="d-flex mb-2">
                                        <span className="bs-icon-xs bs-icon-rounded bs-icon-primary-light bs-icon me-2"></span>
                                        <span>5.1 Audio</span>
                                    </li>
                                </ul>
                            </div>
                            <a className="btn btn-primary d-block w-100" role="button" href="#">Select Plan</a>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card border-primary border-2 h-100">
                        <div className="card-body d-flex flex-column justify-content-between p-4">
                            <span className="badge bg-primary position-absolute top-0 end-0 rounded-bottom-left text-uppercase">Most Popular</span>
                            <div>
                                <h6 className="text-uppercase text-muted">Standard</h6>
                                <h4 className="display-6 fw-bold">$12.99/month</h4>
                                <hr/>
                                <ul className="list-unstyled">
                                    <li className="d-flex mb-2">
                                        <span className="bs-icon-xs bs-icon-rounded bs-icon-primary-light bs-icon me-2"></span>
                                        <span>3 Devices</span>
                                    </li>
                                    <li className="d-flex mb-2">
                                        <span className="bs-icon-xs bs-icon-rounded bs-icon-primary-light bs-icon me-2"></span>
                                        <span>2160p</span>
                                    </li>
                                    <li className="d-flex mb-2">
                                        <span className="bs-icon-xs bs-icon-rounded bs-icon-primary-light bs-icon me-2"></span>
                                        <span>5.1 Audio</span>
                                    </li>
                                    <li className="d-flex mb-2"></li>
                                </ul>
                            </div>
                            <a className="btn btn-primary d-block w-100" role="button" href="#">Select Plan</a>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card h-100">
                        <div className="card-body d-flex flex-column justify-content-between p-4">
                            <div>
                                <h6 className="text-uppercase text-muted">Premium</h6>
                                <h4 className="display-6 fw-bold">$18.99/month</h4>
                                <hr/>
                                <ul className="list-unstyled">
                                    <li className="d-flex mb-2">
                                        <span className="bs-icon-xs bs-icon-rounded bs-icon-primary-light bs-icon me-2"></span>
                                        <span>4 Devices</span>
                                    </li>
                                    <li className="d-flex mb-2">
                                        <span className="bs-icon-xs bs-icon-rounded bs-icon-primary-light bs-icon me-2"></span>
                                        <span>4k Quality Video</span>
                                    </li>
                                    <li className="d-flex mb-2">
                                        <span className="bs-icon-xs bs-icon-rounded bs-icon-primary-light bs-icon me-2"></span>
                                        <span>Dolby Atmos Audio</span>
                                    </li>
                                    <li className="d-flex mb-2"></li>
                                    <li className="d-flex mb-2"></li>
                                    <li className="d-flex mb-2"></li>
                                </ul>
                            </div>
                            <a className="btn btn-primary d-block w-100" role="button" href="#">Select Plan</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section> 
    )
}

export default Hero;