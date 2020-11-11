function jsonToObject(jsonString) {
	return JSON.parse(jsonString, (key, value) => {
		if (key === 'age') {
			return parseInt(value);
		}

		return value;
	});
}

const jsonString = `
	{
		"list": [
			{
		 		"name": "Petr",
		 		"age": "20",
		 		"prof": "mechanic"
			},
			{
		 		"name": "Vova",
		 		"age": "60",
		 		"prof": "pilot"
			}
	 	]
	}
`;


console.log(jsonToObject(jsonString));



