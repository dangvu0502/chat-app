import Login from "./Login";
import ChatRoom from "./ChatRoom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthProvider from "../context/AuthProvider";
import AppProvider from "../context/AppProvider";
import AddRoomModal from "./Modals/AddRoomModal";
import InviteMemberModal from "./Modals/InviteFriendModal";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <Routes>
            <Route path="*" element={<Login />} />
            <Route exact path="/" element={<ChatRoom />} />
          </Routes>
          <AddRoomModal />
          <InviteMemberModal />
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
