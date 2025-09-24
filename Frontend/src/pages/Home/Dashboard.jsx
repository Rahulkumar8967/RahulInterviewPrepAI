import React, { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";
import moment from "moment";

import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import SummaryCard from "../../components/Cards/SummaryCard";
import CreateSessionForm from "./CreateSessionForm";
import Model from "../../components/Model";
import { CARD_BG } from "../../utils/data";

const Dashboard = () => {
  const navigate = useNavigate();
  const [openCreateModel, setOpenCreateModel] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    open: false,
    data: null,
  });

  const fetchAllSessions = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.SESSION.GET_ALL);
      setSessions(response.data || []);
    } catch (error) {
      console.error("Error fetching session data:", error);
    }
  };

  const deleteSessionById = async (sessionId) => {
    try {
      await axiosInstance.delete(API_PATHS.SESSION.DELETE(sessionId));
      setSessions((prev) => prev.filter((s) => s._id !== sessionId));
    } catch (error) {
      console.error("Error deleting session:", error);
      alert("Failed to delete session. Please try again.");
    } finally {
      setOpenDeleteAlert({ open: false, data: null });
    }
  };

  useEffect(() => {
    fetchAllSessions();
  }, []);

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 pt-4 pb-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-1 pb-6">
          {sessions.length === 0 ? (
            <p className="text-center col-span-full text-gray-500">
              No sessions found.
            </p>
          ) : (
            sessions.map((data, index) => (
              <SummaryCard
                key={data?._id}
                colors={CARD_BG[index % CARD_BG.length]}
                role={data?.role || ""}
                topicsToFocus={data?.topicsToFocus || ""}
                experience={data?.experience || "-"}
                questions={data?.questions?.length || "_"}
                description={data?.description || ""}
                lastUpdated={
                  data?.updatedAt
                    ? moment(data.updatedAt).format("Do MMM YYYY")
                    : ""
                }
                onSelect={() => navigate(`/interview-prep/${data?._id}`)}
                onDelete={() => setOpenDeleteAlert({ open: true, data })}
              />
            ))
          )}
        </div>

        <button
          className="h-12 flex items-center justify-center gap-3 bg-gradient-to-r from-[#FF9324] to-[#e99a4b] text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-black hover:text-white transition-colors cursor-pointer hover:shadow-2xl hover:shadow-orange-300 fixed bottom-10 right-10"
          onClick={() => setOpenCreateModel(true)}
        >
          <LuPlus className="text-2xl text-white" />
          Add New
        </button>
      </div>

      {/* Create Session Modal */}
      <Model isOpen={openCreateModel} onClose={() => setOpenCreateModel(false)}>
        <div>
          <CreateSessionForm />
        </div>
      </Model>

      {/* Delete Confirmation Alert */}
      {openDeleteAlert.open && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-xl max-w-sm w-full border border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Delete Session</h3>
            <p className="mb-6">
              Are you sure you want to delete the session{" "}
              <strong>{openDeleteAlert.data?.role}</strong>?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setOpenDeleteAlert({ open: false, data: null })}
                className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded hover:bg-gray-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteSessionById(openDeleteAlert.data._id)}
                className="px-4 py-2 text-sm bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Dashboard;
