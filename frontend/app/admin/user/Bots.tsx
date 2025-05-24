import { useState } from 'react';

export default function Bots() {
    const [loading, setLoading] = useState(false);
    const [responses, setResponses] = useState<{ action: any; status: any; message: any; }[]>([]);

    const handleResponse = (action: any, res: any) => {
        setResponses(prev => [...prev, { action, status: res.status, message: res.statusText }]);
    };

    const RunBot = async () => {
        setLoading(true);
        const res = await fetch('http://localhost:8000/rpa-bot/portfolio', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        handleResponse('Run Portfolio Bot', res);
        setLoading(false);
    };

    const RunFortnightlyBot = async () => {
        setLoading(true);
        const res = await fetch('http://localhost:8000/rpa-bot/fortnightly', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        handleResponse('Run Portfolio Bot', res);
        setLoading(false);
    };

    const RunStockScraperBot = async () => {
        setLoading(true);
        const res = await fetch('http://localhost:8000/rpa-bot/stockscraper', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        handleResponse('Run Portfolio Bot', res);
        setLoading(false);
    };
//files
    const AddAmc = async () => {
        setLoading(true);
        const res = await fetch('http://localhost:8000/data/amc', {
            method: 'POST'
        });
        handleResponse('Amc Data', res);
        setLoading(false);
    };

    const AddMf = async () => {
        setLoading(true);
        const res = await fetch('http://localhost:8000/data/mf', {
            method: 'POST'
        });
        handleResponse('Mutualfund Data', res);
        setLoading(false);
    };

    const AddStock = async () => {
        setLoading(true);
        const res = await fetch('http://localhost:8000/data/stock', {
            method: 'POST'
        });
        handleResponse('Stock Data', res);
        setLoading(false);
    };

    const AddFundstock = async () => {
        setLoading(true);
        const res = await fetch('http://localhost:8000/data/fs', {
            method: 'POST'
        });
        handleResponse('FundStock Data', res);
        setLoading(false);
    };

    const Updatestock = async () => {
        setLoading(true);
        const res = await fetch('http://localhost:8000/data/updatestockdata', {
            method: 'POST'
        });
        handleResponse('Update stock data', res);
        setLoading(false);
    };
    const Addfortnightly = async () => {
        setLoading(true);
        const res = await fetch('http://localhost:8000/data/fort', {
            method: 'POST'
        });
        handleResponse('Fortnightly Data', res);
        setLoading(false);
    };
    const AddIndex = async () => {
        setLoading(true);
        const res = await fetch('http://localhost:8000/data/addindex', {
            method: 'POST'
        });
        handleResponse('Data Science Run', res);
        setLoading(false);
    };
    const AddIndexStock = async () => {
        setLoading(true);
        const res = await fetch('http://localhost:8000/data/addindexstock', {
            method: 'POST'
        });
        handleResponse('Data Science Run', res);
        setLoading(false);
    };
    const DeactivateAllFunds = async () => {
        setLoading(true);
        const res = await fetch('http://localhost:8000/data/deactivatefs', {
            method: 'POST'
        });
        handleResponse('Data Science Run', res);
        setLoading(false);
    };
    const updatemf = async () => {
        setLoading(true);
        const res = await fetch('http://localhost:8000/mf/total', {
            method: 'put'
        });
        handleResponse('Data Science Run', res);
        setLoading(false);
    };
//ds
    const RunMonthlyBot = async () => {
        setLoading(true);
        const res = await fetch('http://localhost:8000/datasci/run', {
            method: 'POST'
        });
        handleResponse('Data Science Run', res);
        setLoading(false);
    };

    const RunFortnightlyDSBot = async () => {
        setLoading(true);
        const res = await fetch('http://localhost:8000/datasci/fortnightly', {
            method: 'POST'
        });
        handleResponse('Data Science Run', res);
        setLoading(false);
    };
    const RunIndiceBot = async () => {
        setLoading(true);
        const res = await fetch('http://localhost:8000/datasci/run-indices', {
            method: 'POST'
        });
        handleResponse('Data Science Run', res);
        setLoading(false);
    };
    // const AddIndex = async () => {
    //     setLoading(true);
    //     const res = await fetch('http://localhost:8000/datasci/', {
    //         method: 'POST'
    //     });
    //     handleResponse('Data Science Run', res);
    //     setLoading(false);
    // };
    // const RunIndiceBot = async () => {
    //     setLoading(true);
    //     const res = await fetch('http://localhost:8000/datasci/', {
    //         method: 'POST'
    //     });
    //     handleResponse('Data Science Run', res);
    //     setLoading(false);
    // };

    return (
        <div>
            {loading && (
                <div className="loading-container ">
                    <span className="loading loading-spinner loading-lg"></span>
                </div>
            )}
            <div className={loading ? "disabled" : ""}>
                <div className='flex justify-between items-center mt-5 flex-wrap'>
                    <h2 className="text-center">RPA Bot: </h2>

                    <div id="run potfolio bot">
                        <button
                            className="btn btn-primary w-full"
                            onClick={RunBot}
                            disabled={loading}
                        >Run Portfolio Bot</button>
                    </div>

                    <div id="run fortnightly bot">
                        <button className="btn btn-primary w-full"
                            onClick={RunFortnightlyDSBot}
                            disabled={loading}
                        >Run Fortnightly Bot</button>
                    </div>

                    <div id="run nse stock scraper bot :">
                        <button className="btn btn-primary w-full"
                            onClick={RunStockScraperBot}
                            disabled={loading}
                        >Run Stock Scraper Bot</button>
                    </div>
                </div>

                <div className='flex justify-between items-center mt-5'>
                    <h2 className="text-center">File Runner: </h2>

                    <div id="Add Amc ">
                        <button
                            className="btn btn-primary w-full"
                            onClick={AddAmc}
                            disabled={loading}
                        >Add Amc</button>
                    </div>
                    <div id="Add Mf">
                        <button className="btn btn-primary w-full"
                            onClick={AddMf}
                            disabled={loading}
                        >Add Mf</button>
                    </div>
                    <div id="Add Stock">
                        <button className="btn btn-primary w-full"
                            onClick={AddStock}
                            disabled={loading}
                        >Add Stock</button>
                    </div>
                    <div id="Add Fundstock">
                        <button className="btn btn-primary w-full"
                            onClick={AddFundstock}
                            disabled={loading}
                        >Add Fundstock</button>
                    </div>
                    <div id="Add stockdetails">
                        <button className="btn btn-primary w-full"
                            onClick={Updatestock}
                            disabled={loading}
                        >Update Stock Details</button>
                    </div>
                    <div id="Add fortnightly">
                        <button className="btn btn-primary w-full"
                            onClick={Addfortnightly}
                            disabled={loading}
                        >Add Fortnightly</button>
                    </div>
                    <div id="Add fortnightly">
                        <button className="btn btn-primary w-full"
                            onClick={AddIndex}
                            disabled={loading}
                        >Add Index</button>
                    </div>
                    <div id="Add fortnightly">
                        <button className="btn btn-primary w-full"
                            onClick={AddIndexStock}
                            disabled={loading}
                        >Add IndexStock</button>
                    </div>
                    <div id="Add Mf">
                        <button className="btn btn-primary w-full"
                            onClick={DeactivateAllFunds}
                            disabled={loading}
                        >Deactivate All Funds</button>
                    </div>
                    <div id="Add Mf">
                        <button className="btn btn-primary w-full"
                            onClick={updatemf}
                            disabled={loading}
                        >Update Mf</button>
                    </div>
                </div>
                <div className='flex justify-between items-center mt-5'>
                    <h2 className="text-center">DATA Scientist: </h2>

                    <div id="Add Amc ">
                        <button
                            className="btn btn-primary w-full"
                            onClick={RunMonthlyBot}
                            disabled={loading}
                        >Run Monthly</button>
                    </div>
                    <div id="Add Mf">
                        <button className="btn btn-primary w-full"
                            onClick={RunFortnightlyBot}

                            disabled={loading}
                        >Run Fortnightly</button>
                    </div>
                    <div id="Add Mf">
                        <button className="btn btn-primary w-full"
                            onClick={RunIndiceBot}
                            disabled={loading}
                        >Run Indice</button>
                    </div>
                    
                </div>
                <div>
                    <h2 className="text-2xl mt-10">Responses:</h2>
                    <div className='border-2'>
                        {responses.map((response, index) => (
                            <div className='border-2 m-1' key={index}>
                                <p>Action: {response.action}</p>
                                <p>Status: {response.status}</p>
                                <p>Message: {response.message}</p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            <style jsx>{`
                .loading-container {
                    text-align: center;
                    margin-bottom: 20px;
                }
                .disabled {
                    pointer-events: none;
                    opacity: 0.6;
                }
            `}</style>
        </div>
    );
}
