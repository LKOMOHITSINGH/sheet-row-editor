document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('input');
    const loadButton = document.getElementById('loadButton');
    const cellContainer = document.getElementById('cellContainer');
    const submitButton = document.getElementById('submitButton');
    const output = document.getElementById('output');

    let cells = [];

    loadButton.addEventListener('click', () => {
        const rowData = input.value.split('\t');
        cells = rowData.map(cellData => {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.contentEditable = true;
            cell.textContent = cellData;
            cell.draggable = true;
            return cell;
        });

        cellContainer.innerHTML = '';
        cells.forEach(cell => cellContainer.appendChild(cell));
        setupDragAndDrop();
    });

    function setupDragAndDrop() {
        cells.forEach(cell => {
            cell.addEventListener('dragstart', dragStart);
            cell.addEventListener('dragover', dragOver);
            cell.addEventListener('drop', drop);
        });
    }

    function dragStart(e) {
        e.dataTransfer.setData('text/plain', e.target.id);
    }

    function dragOver(e) {
        e.preventDefault();
    }

    function drop(e) {
        e.preventDefault();
        const fromIndex = Array.from(cellContainer.children).indexOf(e.target);
        const toIndex = Array.from(cellContainer.children).indexOf(this);
        if (fromIndex !== toIndex) {
            const [removed] = cells.splice(fromIndex, 1);
            cells.splice(toIndex, 0, removed);
            cellContainer.innerHTML = '';
            cells.forEach(cell => cellContainer.appendChild(cell));
            setupDragAndDrop();
        }
    }

    submitButton.addEventListener('click', () => {
        const finalOutput = cells.map(cell => cell.textContent).join('\t');
        output.value = finalOutput;
    });
});
