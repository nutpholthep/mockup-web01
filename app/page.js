"use client";
import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ArrowUpDown,
  MoreHorizontal,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const MedicalHistory = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [sortColumn, setSortColumn] = useState("visitDate");
  const [sortDirection, setSortDirection] = useState("desc");
  const [expandedPatient, setExpandedPatient] = useState(null);

  // Mock data แบบจัดกลุ่มตามผู้ป่วย
  const mockData = [
    {
      hn: "HN066000001",
      name: "สมชาย ใจดี",
      gender: "ชาย",
      age: 45,
      visits: [
        {
          en: "EN00020",
          vn: "VN00020",
          visitDate: "10/12/2024",
          department: "อายุรกรรม",
          doctor: "นาย ปีเตอร์ วัฒนกุล",
        },
        {
          en: "EN00025",
          vn: "VN00025",
          visitDate: "15/12/2024",
          department: "อายุรกรรม",
          doctor: "นาย ปีเตอร์ วัฒนกุล",
        },
      ],
    },
    {
      hn: "HN066000002",
      name: "สมหญิง รักดี",
      gender: "หญิง",
      age: 35,
      visits: [
        {
          en: "EN00021",
          vn: "VN00021",
          visitDate: "16/12/2024",
          department: "ศัลยกรรม",
          doctor: "นาย ปีเตอร์ วัฒนกุล",
        },
      ],
    },
  ];

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const togglePatientExpanded = (hn) => {
    setExpandedPatient(expandedPatient === hn ? null : hn);
  };
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleMenu = (menuName) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menuName]: !prev[menuName],
    }));
  };
  const Icon = ({ type }) => {
    const icons = {
      search: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      ),
      filter: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
          />
        </svg>
      ),
      chevronDown: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      ),
      chevronUp: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 15l7-7 7 7"
          />
        </svg>
      ),
      sort: (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
          />
        </svg>
      ),
      medical: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
          />
        </svg>
      ),
    };
    return icons[type] || null;
  };

  const [expandedMenus, setExpandedMenus] = useState({
    ข้อมูลผู้ป่วยนอก: true,
    การตรวจทางกายภาพ: false,
  });
  return (
    <div className="min-h-screen bg-gray-200 flex">
        <div className="w-64 bg-white border-r h-screen">
          <div className="flex items-center gap-2 p-4 border-b">
            <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center text-white">
              <Icon type="medical" />
            </div>
            <div>
              <div className="font-semibold">Cloud Doctor</div>
              <div className="text-xs text-gray-500">Medical System</div>
            </div>
          </div>

          <div className="px-4 py-2">
            <div className="border-b mb-2">
              <button
                onClick={() => toggleMenu("ข้อมูลผู้ป่วยนอก")}
                className="w-full flex items-center justify-between p-2"
              >
                <span>ข้อมูลผู้ป่วยนอก</span>
                {expandedMenus["ข้อมูลผู้ป่วยนอก"] ? (
                  <Icon type="chevronUp" />
                ) : (
                  <Icon type="chevronDown" />
                )}
              </button>
              {expandedMenus["ข้อมูลผู้ป่วยนอก"] && (
                <div className="ml-4 pb-2 space-y-1">
                  <button className="w-full text-left p-2 rounded hover:bg-gray-50">
                    ข้อมูลทั่วไป
                  </button>
                  <button className="w-full text-left p-2 rounded bg-teal-50 text-teal-600">
                    ประวัติการรักษา
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
    
        <div className="p-6 bg-white m-4 w-full rounded-md">
          <div className="p-6 flex-1">
            <h2 className="text-xl font-semibold mb-4">ประวัติการรักษา</h2>

            <div className="grid grid-cols-5 gap-4 mb-4">
              <div>
                <label className="block text-sm mb-1">EN/VN</label>
                <input type="text" className="w-full border rounded p-2" />
              </div>
              <div>
                <label className="block text-sm mb-1">HN</label>
                <input type="text" className="w-full border rounded p-2" />
              </div>
              <div>
                <label className="block text-sm mb-1">ชื่อ-นามสกุล</label>
                <input type="text" className="w-full border rounded p-2" />
              </div>
              {/* <div>
                <label className="block text-sm mb-1">แผนก</label>
                <select className="w-full border rounded p-2">
                  <option value="">ทั้งหมด</option>
                  <option value="medicine">อายุรกรรม</option>
                  <option value="surgery">ศัลยกรรม</option>
                  <option value="pediatrics">กุมารเวชกรรม</option>
                  <option value="orthopedics">ออร์โธปิดิกส์</option>
                  <option value="obgyn">สูติ-นรีเวช</option>
                </select>
              </div> */}
              <div>
                <label className="block text-sm mb-1 opacity-0">ค้นหา</label>
                <button className="w-full px-6 py-2 bg-teal-500 text-white rounded hover:bg-teal-600">
                  ค้นหา
                </button>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
              <div>
                <label className="block text-sm mb-1">วันที่เริ่มต้น</label>
                <input type="date" className="w-full border rounded p-2" />
              </div>
              <div>
                <label className="block text-sm mb-1">วันที่สิ้นสุด</label>
                <input type="date" className="w-full border rounded p-2" />
              </div>
              {/* <div>
                <label className="block text-sm mb-1">แพทย์ผู้รักษา</label>
                <input type="text" className="w-full border rounded p-2" />
              </div> */}
            </div>
          </div>

          <div className="overflow-x-auto border-t">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="p-4 text-left font-medium text-gray-500">#</th>
                  <th
                    className="p-4 text-left font-medium text-gray-500 cursor-pointer"
                    onClick={() => handleSort("hn")}
                  >
                    <div className="flex items-center gap-2">
                      HN
                      {/* <ArrowUpDown size={16} /> */}
                    </div>
                  </th>
                  <th
                    className="p-4 text-left font-medium text-gray-500 cursor-pointer"
                    onClick={() => handleSort("name")}
                  >
                    <div className="flex items-center gap-2">
                      ชื่อ-นามสกุล
                      {/* <ArrowUpDown size={16} /> */}
                    </div>
                  </th>
                  <th className="p-4 text-left font-medium text-gray-500">
                    เพศ
                  </th>
                  <th className="p-4 text-left font-medium text-gray-500">
                    อายุ
                  </th>
                  {/* <th className="p-4 text-left font-medium text-gray-500">
                    จำนวนครั้งที่รักษา
                  </th> */}
                  <th className="p-4 text-left font-medium text-gray-500">
                    ประวัติการรักษา
                  </th>
                </tr>
              </thead>
              <tbody>
                {mockData.map((patient, index) => (
                  <React.Fragment key={patient.hn}>
                    <tr
                      className={`border-b hover:bg-gray-50 ${
                        expandedPatient === patient.hn ? "bg-gray-50" : ""
                      }`}
                    >
                      <td className="p-4">{index + 1}</td>
                      <td className="p-4">{patient.hn}</td>
                      <td className="p-4">{patient.name}</td>
                      <td className="p-4">{patient.gender}</td>
                      <td className="p-4">{patient.age}</td>
                      {/* <td className="p-4">{patient.visits.length}</td> */}
                      <td className="p-4">
                        <div className="flex gap-2">
                          <button
                            className="p-2 hover:bg-gray-200 rounded-full"
                            onClick={() => togglePatientExpanded(patient.hn)}
                            title={
                              expandedPatient === patient.hn
                                ? "ซ่อนประวัติ"
                                : "ดูประวัติ"
                            }
                          >
                            {expandedPatient === patient.hn ? (
                              <p className="flex justify-center items-center p-2 outline outline-1 outline-emerald-500 rounded-xl space-x-2"> ดูประวัติ <ChevronUp size={20} /></p>
                            ) : (
                              <p className="flex justify-center items-center p-2 outline outline-1 outline-emerald-500 rounded-xl space-x-2"> ดูประวัติ <ChevronDown size={20} /></p>
                              
                            )}
                          </button>
                          {/* <button 
                            className="p-2 hover:bg-gray-200 rounded-full"
                            title="ดูเพิ่มเติม"
                          >
                            <MoreHorizontal size={20} />
                          </button> */}
                        </div>
                      </td>
                    </tr>
                    {expandedPatient === patient.hn && (
                      <tr>
                        <td colSpan="7" className="bg-gray-50 p-4">
                          <div className="overflow-x-auto">
                            <table className="w-full">
                              <thead>
                                <tr className="border-b">
                                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                                    EN/VN
                                  </th>
                                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                                    วันที่รักษา
                                  </th>
                                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                                    แผนก
                                  </th>
                                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                                    แพทย์ผู้รักษา
                                  </th>
                                  {/* <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                                    การดำเนินการ
                                  </th> */}
                                </tr>
                              </thead>
                              <tbody>
                                {patient.visits.map((visit) => (
                                  <tr
                                    key={visit.en}
                                    className="border-b last:border-b-0 hover:bg-gray-100"
                                  >
                                    <td className="px-4 py-2">
                                      <div>{visit.en}</div>
                                      <div className="text-sm text-gray-500">
                                        {visit.vn}
                                      </div>
                                    </td>
                                    <td className="px-4 py-2">
                                      {visit.visitDate}
                                    </td>
                                    <td className="px-4 py-2">
                                      {visit.department}
                                    </td>
                                    <td className="px-4 py-2">
                                      {visit.doctor}
                                    </td>
                                    {/* <td className="px-4 py-2">
                                      <button
                                        className="p-2 hover:bg-gray-200 rounded-full"
                                        title="ดูรายละเอียด"
                                      >
                                        <MoreHorizontal size={16} />
                                      </button>
                                    </td> */}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 border-t flex items-center justify-between">
            <div className="text-sm text-gray-600">
              แสดง 1 ถึง {entriesPerPage} จากทั้งหมด {mockData.length} รายการ
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 border rounded hover:bg-gray-50">
                <ChevronsLeft size={16} />
              </button>
              <button className="p-2 border rounded hover:bg-gray-50">
                <ChevronLeft size={16} />
              </button>
              <button className="p-2 border rounded bg-teal-500 text-white hover:bg-teal-600">
                1
              </button>
              <button className="p-2 border rounded hover:bg-gray-50">
                <ChevronRight size={16} />
              </button>
              <button className="p-2 border rounded hover:bg-gray-50">
                <ChevronsRight size={16} />
              </button>
              <select
                className="ml-2 border rounded p-2"
                value={entriesPerPage}
                onChange={(e) => setEntriesPerPage(Number(e.target.value))}
              >
                <option value={10}>10 แถว</option>
                <option value={25}>25 แถว</option>
                <option value={50}>50 แถว</option>
                <option value={100}>100 แถว</option>
              </select>
            </div>
          </div>
        </div>
  
    </div>

  );
};

export default MedicalHistory;
