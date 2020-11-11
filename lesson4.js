const button = document.querySelector('button');
const resultDiv = document.getElementById('result');

function buttonClick() {
	const width = Number(document.getElementById('firstInput').value);
	const height = Number(document.getElementById('secondInput').value);

	if (width < 100 || width >= 300 || height < 100 || height >= 300 || isNaN(width) || isNaN(height)) {
		resultDiv.innerHTML = 'одно из чисел вне диапазона от 100 до 300';
	} else {
		resultDiv.innerHTML = '';
		sendRequest(width, height)
	}
}

function prepareResponsse(url, width, height) {
	const resultBlock = `
		<div class="card">
			<img width="${width}" height="${height}" class="card-img" alt="image" src="${url}">
		</div>
	`;

	return resultBlock;
}

function sendRequest(width, height) {
	fetch(`https://picsum.photos/${width}/${height}`)
		.then(response => {
			resultDiv.innerHTML = prepareResponsse(response.url, width, height);
		})
		.catch(error => {
			resultDiv.innerHTML = `ERROR! ${error}`;
	});
}

button.addEventListener('click', buttonClick);



