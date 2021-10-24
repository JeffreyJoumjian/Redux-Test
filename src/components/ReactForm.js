import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { insertCandidate } from '../redux/reducers/candidateSlice'

import { Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

import { Form, FormGroup, FormControl, FormLabel } from 'react-bootstrap';



export default function ReactForm() {
	const initialState = {
		firstName: "",
		lastName: "",
		email: "",
		grades: [0, 0, 0, 0, 0, 0, 0]
	}

	const [state, setState] = useState(initialState);
	const dispatch = useDispatch();

	function onChangeHandler(e) {
		if (e.target.name.includes('grade-')) {
			let newGrades = [...state.grades];

			let targetGrade = parseInt(e.target.name.replace("grade-", ""));

			newGrades[targetGrade] = parseFloat(e.target.value);
			setState({ ...state, grades: newGrades });
		}
		else
			setState({ ...state, [e.target.name]: e.target.value });
	}

	function clearFields(e) {
		setState(initialState);
		const inputs = [...document.querySelectorAll('input')];
		inputs.forEach(input => input.value = "");
	}

	function onSubmitHandler(e) {
		if (state.firstName && state.lastName && state.email) {

			e.preventDefault();
			let newStudent = { ...state };

			dispatch(insertCandidate(newStudent));
			clearFields();
		}
	}

	function generateFormNumberInputs() {

		return state.grades.map((grade, i) =>
			<Col key={i} xs="2" lg="1" className={i !== state.grades.length - 1 ? "me-sm-1 mb-4 pe-0" : "mx-auto mx-sm-0 me-lg-2 mb-4 pe-0"}>
				<FormControl
					className="form-input"
					onChange={onChangeHandler}
					type="number"
					placeholder="0"
					min="0"
					max="10"
					defaultValue={0}
					name={`grade-${i}`}
					value={state.grades[i]} />
			</Col>
		);
	}

	return (
		<Form>
			<Row className="">
				<Col xs="12" md="6" lg="4" className="mb-4">
					<FormGroup controlId="formFirstName">
						<FormLabel>First Name</FormLabel>
						<FormControl className="form-input"
							type="text"
							placeholder="John"
							name="firstName"
							value={state.firstName}
							onChange={onChangeHandler}
							required
						/>
					</FormGroup>
				</Col>

				<Col xs="12" md="6" lg="4" className="mb-4">
					<FormGroup controlId="formLastName">
						<FormLabel>Last Name</FormLabel>
						<FormControl className="form-input"
							type="text"
							placeholder="Doe"
							name="lastName"
							value={state.lastName}
							onChange={onChangeHandler}
							required />
					</FormGroup>
				</Col>

				<Col xs="12" md="6" lg="4" className="mb-4">
					<FormGroup controlId="formEmail">
						<FormLabel>Email</FormLabel>
						<FormControl
							className="form-input"
							type="email"
							placeholder="john.doe@email.com"
							name="email"
							value={state.email}
							onChange={onChangeHandler}
							required
						/>
					</FormGroup>
				</Col>
			</Row>

			<Row className="mb-4">
				<Col xs="12">
					<FormGroup controlId="formGrades" className="">
						<FormLabel className="mb-2 me-auto">Grades <small className="text-muted">(out of 10)</small></FormLabel>
						<Row className="">
							{generateFormNumberInputs()}
							<Col xs="12" className="mt-2 d-flex justify-content-center">
								<Button className="me-4" variant="outline-dark" onClick={clearFields}>Clear</Button>
								<Button variant="dark" type="submit" onClick={onSubmitHandler}>Add Candidate</Button>
							</Col>
						</Row>
					</FormGroup>
				</Col>
			</Row>
		</Form>
	)
}
