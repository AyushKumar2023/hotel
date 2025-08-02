import React from "react";
import Navbar from "./components/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import AllRooms from "./pages/AllRooms";
import RoomDetails from "./pages/RoomDetails";
import MyBookings from "./pages/MyBookings";
import HotelReg from "./components/HotelReg";
import Layout from "./pages/hotelOwner/Layout";
import Dashboard from "./pages/hotelOwner/Dashboard";
import AddRooms from "./pages/hotelOwner/AddRooms";
import ListRooms from "./pages/hotelOwner/ListRooms";
import { Toaster } from "react-hot-toast";
import { useAppContext } from "./context/AppContext";

const App = () => {
  const isownerpath = useLocation().pathname.includes("owner");

  const { showHotelReg } = useAppContext();
  return (
    <div className="">
      <Toaster />
      {!isownerpath && <Navbar></Navbar>}
      {showHotelReg && <HotelReg></HotelReg>}
      <div className="min-h-[70vh]">
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/rooms" element={<AllRooms></AllRooms>}></Route>
          <Route
            path="/rooms/:id"
            element={<RoomDetails></RoomDetails>}
          ></Route>
          <Route path="/my-booking" element={<MyBookings></MyBookings>}></Route>
          <Route path="/owner" element={<Layout></Layout>}>
            <Route index element={<Dashboard></Dashboard>}></Route>
            <Route path="add-room" element={<AddRooms></AddRooms>}></Route>
            <Route path="list-room" element={<ListRooms></ListRooms>}></Route>
          </Route>
        </Routes>
      </div>
    </div>
  );
};

export default App;
