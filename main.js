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
        async fetchNotes() {
            const response = await fetch('/api/notes');
            const data = await response.json();
            this.notes = data;
        },

        async addNote() {
            const newNote = {
                title: this.title.trim(),
                content: this.content.trim()
            };
            if (!newNote.title || !newNote.content) {
                alert("Both title and content are required!");
                return;
            }

            const response = await fetch('/api/notes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newNote)
            });
            const addedNote = await response.json();
            this.notes.push(addedNote);

            this.title = '';
            this.content = '';
        },

        async removeNote(noteToRemove) {
            await fetch(`/api/notes/${noteToRemove.id}`, {
                method: 'DELETE'
            });
            this.notes = this.notes.filter(note => note.id !== noteToRemove.id);
        }
    },

    mounted() {
        this.fetchNotes();
    }

}).mount('#app');