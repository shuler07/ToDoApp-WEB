import { useState, useRef, createContext, useEffect } from "react";

import Header from "../components/Header";
import NotesSidebar from "../components/NotesSidebar";
import NotesMain from "../components/NotesMain";

import { WIDTH_WHEN_SIDEBAR_HIDES } from "../data";

export const MainContext = createContext();

export default function MainPage({ isLoggedIn }) {
    
    // Note opened

    const [noteOpened, setNoteOpened] = useState(false);
    const openedNoteData = useRef();

    // Notes and showing notes

    const [notes, setNotes] = useState({
        not_completed: {
            All:[
                {id:1,uid:1,title:'1st',text:'desc1',status:'not_completed',tags:['All','important']},
                {id:2,uid:1,title:'2nd',text:'desc2',status:'not_completed',tags:['All']}
            ],
            important:[
                {id:1,uid:1,title:'1st',text:'desc1',status:'not_completed',tags:['All','important']}
            ]
        },
        completed: {},
        trash: {
            All:[
                {id:3,uid:1,title:'deleted',text:'desc!',status:'trash',tags:['All','todo']}
            ],
            todo:[
                {id:3,uid:1,title:'deleted',text:'desc!',status:'trash',tags:['All','todo']}
            ]
        }
    });
    const [showingNotes, setShowingNotes] = useState([]);

    // Sections and tags

    const [selectedSection, setSelectedSection] = useState("not_completed");
    const [selectedTag, setSelectedTag] = useState("All");

    useEffect(() => {
        if (!notes[selectedSection][selectedTag]) setSelectedTag('All');
        setShowingNotes(notes[selectedSection][selectedTag]);
        setSearchText("");
    }, [notes, selectedSection, selectedTag]);

    // Search

    const [searchText, setSearchText] = useState("");

    function SearchNotes(target) {
        setShowingNotes(() => {
            const _showingNotes = [];

            if (notes[selectedSection][selectedTag]) {
                notes[selectedSection][selectedTag].forEach((value) => {
                    if (value.title.includes(target) || value.text.includes(target))
                        _showingNotes.push(value);
                });
            };

            return _showingNotes;
        });
    }

    // Sidebar

    const [sidebarOpened, setSidebarOpened] = useState(innerWidth > WIDTH_WHEN_SIDEBAR_HIDES);

    window.addEventListener('resize', () => {
        if (innerWidth <= WIDTH_WHEN_SIDEBAR_HIDES) setSidebarOpened(false);
        else if (!sidebarOpened) setSidebarOpened(true);
    });

    return (
        <MainContext.Provider
            value={{
                isLoggedIn,
                noteOpened,
                setNoteOpened,
                openedNoteData,
                notes,
                setNotes,
                showingNotes,
                setShowingNotes,
                selectedSection,
                setSelectedSection,
                selectedTag,
                setSelectedTag,
                sidebarOpened,
                setSidebarOpened
            }}
        >
            <Header
                searchNotes={SearchNotes}
                searchText={searchText}
                setSearchText={setSearchText}
            />
            <div
                style={{
                    height: 'calc(100dvh - 6rem)',
                    position: "relative",
                    display: "flex",
                    gap: "1rem",
                }}
            >
                <NotesSidebar />
                <NotesMain />
            </div>
        </MainContext.Provider>
    );
}
