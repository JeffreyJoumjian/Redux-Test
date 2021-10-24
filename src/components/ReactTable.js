import { useSelector } from 'react-redux';

import Table from "react-bootstrap/Table";
import Fade from 'react-bootstrap/Fade';

import BarChart from "./BarChart";

function generateTableData(candidates) {
	return candidates.map((candidate, i) =>
		<Fade appear={true} in={true} key={i}>
			<tr className="d-flex" style={{ height: '165px' }} >
				<td className="col-2 col-sm-2 align-middle">{candidate.firstName}</td>
				<td className="col-2 col-sm-2 align-middle">{candidate.lastName}</td>
				<td className="col-3 col-sm-3 align-middle">{candidate.email}</td>
				<td className="col-5 col-sm-5 ">
					<BarChart index={i} />
				</td>
			</tr>
		</Fade>
	);
}

export default function ReactTable() {

	let candidates = useSelector(state => state.candidates);

	return (
		<Table bordered hover responsive>
			<thead>
				<tr className="d-flex">
					<th className="col-2 col-sm-2">First Name</th>
					<th className="col-2 col-sm-2">Last Name</th>
					<th className="col-3 col-sm-3">Email</th>
					<th className="col-5 col-sm-5">Grades</th>
				</tr>
			</thead>
			<tbody>
				{generateTableData(candidates)}
			</tbody>
		</Table>
	)
}
