document.getElementById('randomize').addEventListener('click', () => {
    const nameList = document.getElementById('nameList').value.split('\n');
    for (let i = nameList.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [nameList[i], nameList[j]] = [nameList[j], nameList[i]];
    }
    document.getElementById('nameList').value = nameList.join('\n');
});

document.getElementById('run').addEventListener('click', () => {
    const nameList = document.getElementById('nameList').value.split('\n');
    const splitNumber = parseInt(document.getElementById('splitNumber').value, 10);
    if (splitNumber < 1 || isNaN(splitNumber)) {
        alert('请输入有效的分割数量');
        return;
    }

    const zip = new JSZip();
    for (let i = 0; i < nameList.length; i += splitNumber) {
        const chunk = nameList.slice(i, i + splitNumber).join('\n');
        zip.file(`part_${Math.floor(i / splitNumber) + 1}.txt`, chunk);
    }

    zip.generateAsync({ type: 'blob' }).then(content => {
        saveAs(content, 'name_list.zip');
    });
});
