const button = document.querySelector('button');
const resultDiv = document.getElementById('result');

function buttonClick() {
	const numberOfPage = Number(document.getElementById('numberOfPage').value);
	const limit = Number(document.getElementById('limit').value);

	// В numberInRange и limitInRange неправильно прописано условие. В данном случае должно использоваться логическое И вместо ИЛИ, т.к. нам нужно, чтобы одновременно соблюдались оба условия: значение должно быть больше 1 И меньше 10
	const numberInRange = numberOfPage < 10 && numberOfPage >= 1;
	const limitInRange = limit < 10 && limit >= 1;

	if (!numberInRange && !limitInRange) {
		resultDiv.innerHTML = 'Номер страницы и лимит вне диапазона от 1 до 10';
	} else if (!limitInRange) {
		resultDiv.innerHTML = 'Лимит вне диапазона от 1 до 10';
	} else if (!numberInRange) {
		resultDiv.innerHTML = 'Номер страницы вне диапазона от 1 до 10';
	} else {
		resultDiv.innerHTML = '';
		sendRequest(numberOfPage, limit)
	}
}

function prepareResponsse(response) {
	let resultBlock = '';
	response.forEach(item => {
		const cardBlock = `
			<div class="card">
				<img width="350px" class="card-img" alt="image" src="${item.download_url}">
				<p>${item.author}</p>
			</div>
		`;

		resultBlock += cardBlock;
	});

	return resultBlock;
}

function sendRequest(page, limit) {
	fetch(`https://picsum.photos/v2/list?page=${page}&limit=${limit}`)
		.then(response => {
			return response.json();
		})
		.then(data => {
			localStorage.setItem('images', JSON.stringify(data));
			resultDiv.innerHTML = prepareResponsse(data);
		})
		.catch(error => {
			resultDiv.innerHTML = `ERROR! ${error}`;
	});
}

function loadImagesFromStorage() {
	const images = JSON.parse(localStorage.getItem('images'));

	if (images !== null) {
		resultDiv.innerHTML = prepareResponsse(images);
	}
}

button.addEventListener('click', buttonClick);
document.addEventListener('DOMContentLoaded', loadImagesFromStorage);



