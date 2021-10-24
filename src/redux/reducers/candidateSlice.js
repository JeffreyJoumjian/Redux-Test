import { createSlice } from "@reduxjs/toolkit";

function calculateAverage(grades) {
	return grades.reduce((p, n) => (p + n), 0) / grades.length;
}

const candidateSlice = createSlice({
	name: 'candidateSlice',
	initialState: [],
	reducers: {
		insertCandidate: (state, { payload }) => {
			const { firstName, lastName, email, grades } = payload;
			let newCandidate = { firstName, lastName, email, grades, average: calculateAverage(grades) };
			state.push(newCandidate);
		}
	}
});

export const { insertCandidate } = candidateSlice.actions;
export default candidateSlice.reducer;