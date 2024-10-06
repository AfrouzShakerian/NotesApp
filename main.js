const { createApp } = Vue;

createApp({
    data() {
        return {
            title: '',
            content: '',
            notes: []
        };
    },
    methods: {
        addNote() {
            const newNote = {
                id: Date.now(),
                title: this.title.trim(),
                content: this.content.trim()
            };
            if (!newNote.title || !newNote.content) {
                alert("Both title and content are required!");
                return;
            }
            this.notes.push(newNote);
            this.saveNotesToStorage();

            this.title = '';
            this.content = '';
        },

        removeNote(noteToRemove) {
            this.notes = this.notes.filter(note => note.id !== noteToRemove.id);
            this.saveNotesToStorage();
        },

        saveNotesToStorage() {
            localStorage.setItem('notes', JSON.stringify(this.notes));
        },

        loadNotesFromStorage() {
            const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
            this.notes = savedNotes;
        }
    },

    mounted() {
        // Automatically load notes when the component is mounted
        this.loadNotesFromStorage();
    }

}).mount('#app');