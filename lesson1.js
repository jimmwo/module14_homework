const { DOMParser: LibDomParser } = require('xmldom');
const NODE_TYPE_ELEMENT = 1;
const NODE_TYPE_ATTRIBUTE = 2;
const NODE_TYPE_TEXT = 3;


// Динамический парсинг xml
function xmlToJsonWithLib(xmlString) {
	const parser = new LibDomParser();
	const xmlDom = parser.parseFromString(xmlString, 'text/xml');

	return xmlObjectToJson(xmlDom);
}

function xmlObjectToJson(xmlObject, jsonObject = {}) {
	let resultObject;
	let attributesObject = {};

	if (xmlObject.attributes && xmlObject.hasAttributes()) {
		for (let attr in xmlObject.attributes) {
			if (xmlObject.attributes[attr].nodeType === NODE_TYPE_ATTRIBUTE) {
				jsonObject[xmlObject.attributes[attr].nodeName] = xmlObject.attributes[attr].nodeValue;
				attributesObject[xmlObject.attributes[attr].nodeName] = xmlObject.attributes[attr].nodeValue;
			}
		}
	}

	if (xmlObject.hasChildNodes()) {
		for (let node in xmlObject.childNodes) {
			if (xmlObject.childNodes[node].nodeType === NODE_TYPE_ELEMENT) {
				resultObject = xmlObjectToJson(xmlObject.childNodes[node]);
				if (!jsonObject[xmlObject.childNodes[node].nodeName] && typeof resultObject === 'object') {
					jsonObject[xmlObject.childNodes[node].nodeName] = [];
				}

				if (typeof resultObject === 'object') {
					jsonObject[xmlObject.childNodes[node].nodeName].push(resultObject);
				} else {
					jsonObject[xmlObject.childNodes[node].nodeName] = resultObject;
				}
			} else if (xmlObject.childNodes[node].nodeType === NODE_TYPE_TEXT && xmlObject.childNodes[node].nodeValue.trim() !== '') {
				jsonObject = xmlObject.childNodes[node].nodeValue;
			}
		}
	}

	return jsonObject;
}

function xmlToJsonWithBrowser(xmlString) {
	const parser = new DOMParser();
	const xmlDom = parser.parseFromString(xmlString, 'text/xml');
	const students = xmlDom.querySelectorAll('student');
	const jsonObject = {
		list: []
	};

	for (let i = 0; i < students.length; i++) {
		const name = students[i].querySelector('name');
		const age = students[i].querySelector('age');
		const prof = students[i].querySelector('prof');
		const lang = name.getAttribute('lang');

		jsonObject.list.push({
			name: `${name.querySelector('first').textContent} ${name.querySelector('second').textContent}`,
			age: age.textContent,
			prof: prof.textContent,
			lang: lang
		});
	}


	return jsonObject;
}

const xmlString = `
	<list>
		<student>
			<name lang="en">
				<first>Ivan</first>
				<second>Ivanov</second>
			</name>
			<age>35</age>
			<prof>teacher</prof>
		</student>
		<student>
			<name lang="ru">
				<first>Петр</first>
				<second>Петров</second>
			</name>
			<age>58</age>
			<prof>driver</prof>
		</student>
	</list>
`;


console.log(JSON.stringify(xmlToJsonWithLib(xmlString)));

// Работает только в браузере
console.log(JSON.stringify(xmlToJsonWithBrowser(xmlString)));


