// Levels Buttons Code
fetch("https://openapi.programming-hero.com/api/levels/all")
	.then((levelRes) => levelRes.json())
	.then((levels) => displayLevels(levels.data));

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
                        class="w-14 h-14 flex items-center justify-center cursor-pointer bg-[rgba(26,145,255,0.10)] rounded-lg"
                    >
                        <i class="fa-solid fa-circle-info text-[18px]"></i>
                    </button>
                    <button
                        class="w-14 h-14 flex items-center justify-center cursor-pointer bg-[rgba(26,145,255,0.10)] rounded-lg"
                    >
                        <i class="fa-solid fa-volume-high text-[18px]"></i>
                    </button>
                </div>
            </div>
        `;
		wordParent.appendChild(wordCard);
	}
};
