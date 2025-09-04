function pronounceWord(word) {
	const utterance = new SpeechSynthesisUtterance(word);
	utterance.lang = "en-EN"; // English
	window.speechSynthesis.speak(utterance);
}

// Levels Buttons Code
fetch("https://openapi.programming-hero.com/api/levels/all")
	.then((levelRes) => levelRes.json())
	.then((levels) => displayLevels(levels.data));

const manageSpinner = (status) => {
	if (status === true) {
		document.getElementById("spinner").classList.remove("hidden");
		document.getElementById("lessons-contents").classList.add("hidden");
	} else {
		document.getElementById("lessons-contents").classList.remove("hidden");
		document.getElementById("spinner").classList.add("hidden");
	}
};

// Display Tab Buttons
const displayLevels = (levels) => {
	const lessonBtnParent = document.getElementById("lessons-btns");
	for (const level of levels) {
		const btnDiv = document.createElement("div");
		btnDiv.innerHTML = `
            <button
                id="targetBtn${level.level_no}"
                onclick='loadData(${level.level_no})'
                class="tab-button py-[10px] px-[17px] border-[1px] border-[#422AD5] text-[#422AD5] text-[14px] font-semibold cursor-pointer rounded-lg flex items-center gap-x-[6px]"
            >
                <i class="fa-solid fa-book-open-reader"></i>
                Lesson - ${level.level_no}
            </button>
        `;
		lessonBtnParent.appendChild(btnDiv);
	}
};

// Load Data By Button Clicking
const loadData = (id) => {
	manageSpinner(true);
	fetch(`https://openapi.programming-hero.com/api/level/${id}`)
		.then((dataRes) => dataRes.json())
		.then((levelData) => {
			// Remove Active Class Code
			const activedButtons = document.querySelectorAll(".tab-button");
			for (const activedButton of activedButtons) {
				activedButton.classList.remove("btn-active");
			}
			// Add Active Class Code
			const activeButton = document.getElementById(`targetBtn${id}`);
			activeButton.classList.add("btn-active");
			displayLevelData(levelData.data);
		});
};

// Display Level Data
const displayLevelData = (allData) => {
	const wordParent = document.getElementById("lessons-contents");
	wordParent.innerHTML = "";
	if (allData.length === 0) {
		wordParent.innerHTML = `
            <div
                class="py-[34px] flex flex-col items-center gap-y-3 col-span-12"
            >
                <img src='./images/nodata-alert-img.png' />
                <p
                    class="text-[#79716B] text-[14px] font-normal Hind-Siliguri"
                >
                    এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
                </p>
                <h2
                    class="text-[#292524] text-[35px] font-medium Hind-Siliguri"
                >
                    নেক্সট Lesson এ যান
                </h2>
            </div>
        `;
		manageSpinner(false);
		return;
	}

	for (const word of allData) {
		const wordCard = document.createElement("div");
		wordCard.innerHTML = `
            <div class="p-6 lg:py-8 lg:px-7 xl:py-[56px] xl:px-[46px] rounded-xl bg-white">
                <div class="flex flex-col items-center gap-y-2 lg:gap-y-3 xl:gap-y-6">
                    <h3 class="text-[#000] text-[32px] font-medium Inter">${
						word.word ? word.word : "Word Not Found"
					}</h3>
                    <p class="text-[#000] text-[20px] font-medium Inter">
                        Meaning /Pronounciation
                    </p>
                    <h4 class="text-[#18181B] xl:text-[20px] xxl:text-[30px] font-semibold Hind-Siliguri">
                        "${word.meaning ? word.meaning : "Word Not Found"} / ${
			word.pronunciation ? word.pronunciation : "Word Not Found"
		}"
                    </h4>
                </div>
                <div class="pt-6 lg:pt-[56px] flex items-center justify-between">
                    <button
                        onclick="loadWordDetail(${word.id})"
                        class="w-14 h-14 flex items-center justify-center cursor-pointer bg-[rgba(26,145,255,0.10)] rounded-lg"
                    >
                        <i class="fa-solid fa-circle-info text-[18px]"></i>
                    </button>
                    <button
                        onclick="pronounceWord('${word.word}')"
                        class="w-14 h-14 flex items-center justify-center cursor-pointer bg-[rgba(26,145,255,0.10)] rounded-lg"
                    >
                        <i class="fa-solid fa-volume-high text-[18px]"></i>
                    </button>
                </div>
            </div>
        `;
		wordParent.appendChild(wordCard);
	}
	manageSpinner(false);
};

const loadWordDetail = async (id) => {
	const url = `https://openapi.programming-hero.com/api/word/${id}`;
	const res = await fetch(url);
	const wordDetailData = await res.json();
	displayWordDetails(wordDetailData.data);
};

const displayWordDetails = (word) => {
	const wordDetailsContainer = document.getElementById(
		"word-details-container"
	);
	const getSynonyms = (synonymsArray) => {
		if (!synonymsArray || synonymsArray.length === 0)
			return "<li>Not Found</li>";
		return synonymsArray
			.map(
				(syn) =>
					`<li class='py-[6px] px-5 border-[1px] border-[#D7E4EF] bg-[#D7E4EF] rounded-[6px] text-[#000] text-[20px] font-normal capitalize'>${syn}</li>`
			)
			.join("");
	};

	wordDetailsContainer.innerHTML = `
        <div>
            <h3 class="text-[#000] text-[36px] font-semibold mb-8">
                ${word.word ? word.word : "Not Found"} ( 
                <i class="fa-solid fa-microphone-lines"></i> :${
					word.pronunciation ? word.pronunciation : "Not Found"
				})
            </h3>
            <p
                class="text-[#000] text-[24px] font-semibold mb-[10px]"
            >
                Meaning
            </p>
            <p
                class="text-[#000] text-[24px] font-medium Hind-Siliguri mb-8"
            >
                ${word.meaning ? word.meaning : "Not Found"}
            </p>
            <p class="text-[#000] text-[24px] font-semibold">
                Example
            </p>
            <p class="text-[#000] text-[24px] font-normal mb-8">
                ${word.sentence ? word.sentence : "Not Found"}
            </p>
            <p
                class="text-[#000] text-[24px] font-medium Hind-Siliguri"
            >
                সমার্থক শব্দ গুলো
            </p>
            <ul id="synoname-parent" class="flex items-center gap-x-[18px]">
                ${getSynonyms(word.synonyms)}
            </ul>
        </div>
    `;

	document.getElementById("word_details_modal").showModal();
};

document.getElementById("search-btn").addEventListener("click", () => {
	// Remove Active Class Code
	const activedButtons = document.querySelectorAll(".tab-button");
	for (const activedButton of activedButtons) {
		activedButton.classList.remove("btn-active");
	}
	const searchValue = document
		.getElementById("search-input")
		.value.trim()
		.toLowerCase();

	fetch("https://openapi.programming-hero.com/api/words/all")
		.then((res) => res.json())
		.then((data) => {
			const allWords = data.data;
			const filterWord = allWords.filter((word) =>
				word.word.toLowerCase().includes(searchValue)
			);
			displayLevelData(filterWord);
		});
});
