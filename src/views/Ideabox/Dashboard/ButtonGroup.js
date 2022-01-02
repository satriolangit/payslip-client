import React, {Fragment} from 'react';
import {Button} from 'reactstrap';

const KomiteButtonGroup = ({onAccept, onExport, onRefresh}) => {
    return (
        <Fragment>
            <Button color="secondary" onClick={onRefresh} className="btn btn-sm">
                  <i className="icon-refresh" /> Refresh
            </Button>
            <Button color="primary" onClick={onAccept} className="btn btn-sm">
                  <i className="icon-check" /> Accept
            </Button>
            <Button color="success" onClick={onExport} className="btn btn-sm">
                  <i className="icon-printer" /> Export
            </Button>
        </Fragment>
    )
}

const SectionManagerButtonGroup = ({onApprove, onEdit, onExport, onRefresh, onReject}) => {
    return (
        <Fragment>
             <Button color="secondary" onClick={onRefresh} className="btn btn-sm">
                  <i className="icon-refresh" /> Refresh
            </Button>
            <Button color="success" onClick={onApprove} className="btn btn-sm">
                  <i className="icon-check" /> Approve
            </Button>
            <Button color="danger" onClick={onReject} className="btn btn-sm">
                  <i className="icon-close" /> Reject
            </Button>
            <Button color="primary" onClick={onEdit} className="btn btn-sm">
                  <i className="icon-pencil" /> Edit
            </Button>
            <Button color="info" onClick={onExport} className="btn btn-sm">
                  <i className="icon-printer" /> Export
            </Button>
        </Fragment>
    )
}


const DeparmentManagerButtonGroup = ({onApprove, onEdit, onExport, onRefresh, onReject}) => {
    return (
        <Fragment>
             <Button color="secondary" onClick={onRefresh} className="btn btn-sm">
                  <i className="icon-refresh" /> Refresh
            </Button>
            <Button color="success" onClick={onApprove} className="btn btn-sm">
                  <i className="icon-check" /> Approve
            </Button>
            <Button color="danger" onClick={onReject} className="btn btn-sm">
                  <i className="icon-close" /> Reject
            </Button>
            <Button color="primary" onClick={onEdit} className="btn btn-sm">
                  <i className="icon-pencil" /> Edit
            </Button>
            <Button color="info" onClick={onExport} className="btn btn-sm">
                  <i className="icon-printer" /> Export
            </Button>
        </Fragment>
    )
}

const EmployeeButtonGroup = ({onSubmit, onRefresh}) => {
    return (
        <Fragment>
             <Button color="secondary" onClick={onRefresh} className="btn btn-sm">
                  <i className="icon-refresh" /> Refresh
            </Button>
            <Button color="success" onClick={onSubmit} className="btn btn-sm">
                  <i className="icon-plus" /> Submit
            </Button>
        </Fragment>
    )
}

const AdminButtonGroup = ({onExport, onRefresh}) => {
    return (
        <Fragment>
             <Button color="secondary" onClick={onRefresh} className="btn btn-sm">
                  <i className="icon-refresh" /> Refresh
            </Button>
            <Button color="success" onClick={onExport} className="btn btn-sm">
                  <i className="icon-printer" /> Export
            </Button>
        </Fragment>
    )
}

export { KomiteButtonGroup, AdminButtonGroup, SectionManagerButtonGroup, DeparmentManagerButtonGroup, EmployeeButtonGroup }
