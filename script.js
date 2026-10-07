// PersonaCard
// Character card generator

const fields = {
    name: document.getElementById("name"),
    background: document.getElementById("background"),
    personality: document.getElementById("personality"),
    speakingStyle: document.getElementById("speakingStyle"),
    userName: document.getElementById("userName"),
    openingMessage: document.getElementById("openingMessage"),
    extraSetting: document.getElementById("extraSetting"),
    systemPrompt: document.getElementById("systemPrompt")
};

const preview = {
    name: document.getElementById("previewName"),
    background: document.getElementById("previewBackground"),
    personality: document.getElementById("previewPersonality"),
    speakingStyle: document.getElementById("previewSpeakingStyle"),
    userName: document.getElementById("previewUserName"),
    openingMessage: document.getElementById("previewOpeningMessage"),
    extraSetting: document.getElementById("previewExtraSetting"),
    systemPrompt: document.getElementById("previewSystemPrompt")
};

const copyButton = document.getElementById("copyButton");
const exportButton = document.getElementById("exportButton");


// 获取当前角色数据
function getCharacterData() {
    return {
        name: fields.name.value.trim(),
        background: fields.background.value.trim(),
        personality: fields.personality.value.trim(),
        speakingStyle: fields.speakingStyle.value.trim(),
        userName: fields.userName.value.trim(),
        openingMessage: fields.openingMessage.value.trim(),
        extraSetting: fields.extraSetting.value.trim(),
        systemPrompt: fields.systemPrompt.value.trim()
    };
}


// 更新右侧预览
function updatePreview() {
    const data = getCharacterData();

    preview.name.textContent =
        data.name || "未命名角色";

    preview.background.textContent =
        data.background || "暂未填写";

    preview.personality.textContent =
        data.personality || "暂未填写";

    preview.speakingStyle.textContent =
        data.speakingStyle || "暂未填写";

    preview.userName.textContent =
        data.userName || "暂未填写";

    preview.openingMessage.textContent =
        data.openingMessage || "暂未填写";

    preview.extraSetting.textContent =
        data.extraSetting || "暂未填写";

    preview.systemPrompt.textContent =
        data.systemPrompt || "暂未填写";

    saveCharacter();
}


// 保存到浏览器
function saveCharacter() {
    const data = getCharacterData();

    localStorage.setItem(
        "personaCardData",
        JSON.stringify(data)
    );
}


// 读取浏览器中的角色数据
function loadCharacter() {
    const savedData =
        localStorage.getItem("personaCardData");

    if (!savedData) return;

    try {
        const data = JSON.parse(savedData);

        Object.keys(fields).forEach(key => {
            if (data[key] !== undefined) {
                fields[key].value = data[key];
            }
        });

    } catch (error) {
        console.error(
            "Failed to load character data:",
            error
        );
    }
}


// 生成文本格式角色卡
function createCharacterText() {
    const data = getCharacterData();

    return `角色名称：${data.name || "未命名角色"}

身份背景：
${data.background || "暂未填写"}

性格：
${data.personality || "暂未填写"}

说话方式：
${data.speakingStyle || "暂未填写"}

对用户的称呼：
${data.userName || "暂未填写"}

开场白：
${data.openingMessage || "暂未填写"}

补充设定：
${data.extraSetting || "暂未填写"}

System Prompt：
${data.systemPrompt || "暂未填写"}`;
}


// 监听所有输入框
Object.values(fields).forEach(field => {

    field.addEventListener(
        "input",
        updatePreview
    );

});


// 复制角色卡
copyButton.addEventListener(
    "click",
    async () => {

        const text = createCharacterText();

        try {

            await navigator.clipboard.writeText(text);

            const oldText =
                copyButton.textContent;

            copyButton.textContent =
                "复制成功 ✓";

            setTimeout(() => {
                copyButton.textContent =
                    oldText;
            }, 1500);

        } catch (error) {

            alert("复制失败，请手动复制。");

        }

    }
);


// 导出 JSON
exportButton.addEventListener(
    "click",
    () => {

        const data = getCharacterData();

        const json = JSON.stringify(
            data,
            null,
            2
        );

        const blob = new Blob(
            [json],
            {
                type:
                "application/json;charset=utf-8"
            }
        );

        const url =
            URL.createObjectURL(blob);

        const link =
            document.createElement("a");

        const fileName =
            data.name
                ? `${data.name}.json`
                : "character.json";

        link.href = url;
        link.download = fileName;

        document.body.appendChild(link);

        link.click();

        link.remove();

        URL.revokeObjectURL(url);

    }
);


// 页面启动
loadCharacter();
updatePreview();
