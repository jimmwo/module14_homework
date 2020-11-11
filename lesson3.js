const button = document.querySelector('button');
const resultDiv = document.getElementById('result');

function buttonClick() {
	const value = Number(document.querySelector('input').value);
	if (value > 10 || value < 1) {
		resultDiv.innerHTML = 'число вне диапазона от 1 до 10';
	} else {
		sendRequest(value)
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

function sendRequest(limit) {
	const xhr = new XMLHttpRequest();
	xhr.open('GET', `https://picsum.photos/v2/list?limit=${limit}`);

	xhr.onload = () => {
		if (xhr.status === 200) {
			const result = JSON.parse(xhr.response);

			resultDiv.innerHTML = prepareResponsse(result);
		} else {
			resultDiv.innerHTML = `Статус ответа ${xhr.status}`;
		}
	};

	xhr.onerror = () => {
		resultDiv.innerHTML = `ERROR! Статус ответа ${xhr.status}`;
	};

	xhr.send();
}

button.addEventListener('click', buttonClick);



