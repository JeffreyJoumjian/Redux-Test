import { useSelector } from 'react-redux';

import { Container, Row, Col } from 'react-bootstrap';
import Fade from 'react-bootstrap/Fade';

import './App.css';
import ReactForm from './components/ReactForm';
import ReactTable from './components/ReactTable';

function App() {

	const candidates = useSelector(state => state.candidates);

	return (
		<div className="App">
			<Container fluid className="py-5">

				<Row>
					<Fade appear={true} in={true}>
						<Col xs="12" lg="10" xl="9" className="mx-auto p-4 card-shadow">
							<h1 className="mb-4">Add New Candidate</h1>
							<ReactForm />
						</Col>
					</Fade>
				</Row>
				<Row>
					<Fade appear={true} in={true}>
						<Col xs="12" lg="10" xl="9" className="mx-auto mt-5 p-4 card-shadow">
							<h1 className="mb-4">Candidates</h1>
							{(!candidates || candidates.length === 0) &&
								<h5 className="text-muted text-center">No Candidate Data</h5>
							}
							{candidates && candidates.length > 0 &&
								<Fade appear={true} in={true}>
									<ReactTable />
								</Fade>
							}
						</Col>
					</Fade>
				</Row>
			</Container>
		</div>
	);
}

export default App;
