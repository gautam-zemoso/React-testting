import React, { Component } from 'react';
import financialSummary from '../src/financial_summary.json';
import {TEXT_CONSTANT} from '../src/constants/constant';
import {getAccountSummary} from './converter/convertCatrgoriesClientToService';

const constants = {
    reportNumber: "0-12nr2obt240-qihfw048-ednow84-dqnoqr83e",
    dateRange:"Dec 01, 2021 - Dec 31, 2021",
    dateGenerated:"Dec 01, 2021",
}

export default class Payment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            input: '',
            paymentItem: this.props.default.paymentItem,
            find: this.props.default.find,
            result: '',
        };
    }

    findPerson() {
        return this.state.paymentItem.find(
            person => person.toLowerCase() === (this.state.find.toLowerCase()));
    }

    handleInputSearch(event) {
        this.setState({
            input: event.target.value
        })
    };

    render() {
        const accountSummaryTable = getAccountSummary(financialSummary.categorySummaries);
        return (
            <div className="rightDiv1">
            <p className="paymentActivity">{TEXT_CONSTANT.PAYMENT_ACTIVITY_REPORT}</p>
            <div>
                <ul className="right">
                     <li>{`${TEXT_CONSTANT.DATE_RANGE}: ${constants.dateRange}`}</li>
                     <li>{`${TEXT_CONSTANT.GENERATED}: ${constants.dateGenerated}`}</li>
                     <li> <a className="ahref" href={"."}>{TEXT_CONSTANT.VIEW_REPORT_EXAMPLE}</a></li> 
                
                </ul>
                <ul className="left">
                <li>{TEXT_CONSTANT.REPORT_NUMBER}</li>
                <li className={"liReportNumber" }>{constants.reportNumber}</li>
                </ul>
            </div>
            <table>
                <thead>
                    <tr className="accountSummary"><th className="accountSummarySub">{TEXT_CONSTANT.ACCOUNT_SUMMARY}</th></tr>
                </thead>
                <tbody>
                    {accountSummaryTable.map((row, index) => {
                        return (<tr className={index % 2 === 0 ? "trFirst" : ""} key={index}>
                            <td className="tdFirst">{TEXT_CONSTANT[row.title]}</td>
                            <td className="tdLast">{row.amount}</td>
                        </tr>)
                        ;
                    })}
                </tbody>
            </table>  
            <div>
                <input type="search" placeholder="Search Name" className='search'
                    onChange={(event) => {
                       this.handleInputSearch(event)
                    }} />
                <span data-testid='span'>
                    {this.findPerson()}
                </span>
            </div>          
        </div>
        );
    }
}