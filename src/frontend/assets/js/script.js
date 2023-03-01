// const appLogo = document.querySelector("link").href;
// let htmlHeaderModal = `<div class="pt-4"></div><img src="${appLogo}" width="135" height="155" class="d-inline-block align-text-top"><p class="pt-3" style="font-size: 25px;">${appName}</p>`;
// let htmlFooterModal = `<div class="text-center"><p onclick="location.href = 'https://www.instagram.com/${scriptinfo.author_instagram.slice(1)}'" style="font-size: 14px;" class="pt-3">❤ Created by ${scriptinfo.author}</p></div>`;

// let struct_obj = {
//     keyup_text: "",
//     keyup_text_temporary: "",
//     key: "",
//     status_absen: "",
//     time_zone: "",
//     time_absen: {
//         min_masuk: "",
//         max_masuk: "",
//         max_terlambat: ""
//     },
//     absen: {
//         count_masuk: 0,
//         count_terlambat: 0
//     },
//     gridjs_init: {}
// };

// const activeAnimationAos = () => {
//     AOS.init({ duration: "3000", easing: "Linear", });
// };

// const getJam = () => {
//     dayjs.extend(window.dayjs_plugin_utc);
//     dayjs.extend(window.dayjs_plugin_timezone);
//     return dayjs.utc().tz(struct_obj.time_zone).format("HH:mm:ss");
// };

// const realtimeJam = (timezone = "") => {
//     const getIdRealtimeJam = document.getElementById("card-text-3");
//     const getIdStatusAbsen = document.getElementById("card-text-5");
//     setInterval(() => {
//         const jamNow = getJam();
//         getIdRealtimeJam.textContent = jamNow;
//         let stat = "";
//         if (jamNow >= struct_obj.time_absen.min_masuk && jamNow <= struct_obj.time_absen.max_masuk) {
//             stat = "MASUK";
//         } else if (jamNow >= struct_obj.time_absen.max_masuk && jamNow <= struct_obj.time_absen.max_terlambat) {
//             stat = "TERLAMBAT";
//         } else {
//             stat = "ALPHA";
//         }
//         struct_obj.status_absen = stat;
//         getIdStatusAbsen.textContent = `Status Absen : ${stat}`;
//     }, 1000);
// };

// const renderTableGridJs = ({ limit = 0, columns = [], data = [], elementId = "" }) => {
//     const tablegrid = new gridjs.Grid({
//         width: "100",
//         sort: true,
//         autoWidth: false,
//         fixedHeader: true,
//         pagination: {
//             enabled: true,
//             limit
//         },
//         search: {
//             enabled: true
//         },
//         style: {
//             table: {
//                 'white-space': 'nowrap'
//             },
//             th: {
//                 'text-align': 'center'
//             },
//             td: {
//                 'text-align': 'center',
//                 'font-size': '1.04rem',
//             }
//         },
//         columns,
//         data
//     }).render(document.getElementById(elementId));
//     return tablegrid;
// };

// const getConfigGridJsTable = ({ limit = 0, columns = [], data = [] }) => {
//     return {
//         width: "100",
//         sort: true,
//         autoWidth: false,
//         fixedHeader: true,
//         pagination: {
//             enabled: true,
//             limit
//         },
//         search: {
//             enabled: true
//         },
//         style: {
//             table: {
//                 'white-space': 'nowrap'
//             },
//             th: {
//                 'text-align': 'center'
//             },
//             td: {
//                 'text-align': 'center',
//                 'font-size': '1.05rem',
//             }
//         },
//         columns,
//         data
//     };
// };

// const eventRowClickGridJs = (gridTable = {}, urlPath = "") => {
//     gridTable.on('rowClick', (...args) => {
//         const uniqueKey = args[1]._cells[0].data;
//         const urlPathRes = `${urlPath}?${uniqueKey}`;
//         navigator.clipboard.writeText(urlPathRes);
//     });
// };

// const renderTableGridDownloadDataPersonsWithKey = async (uniqueKey = "") => {
//     const findOneDataWithKey = async () => {
//         try {
//             const findOneData = (await axios.get(`/api/persons/data/${uniqueKey}`)).data;

//             const columnsData = Object.keys(findOneData).map((it, index) => {
//                 return { name: it, width: index == 1 ? "90px" : index == 2 ? "150px" : null }
//             });

//             const mappingGetAllData = [findOneData].map((it) => {
//                 const { masuk, terlambat, alpha, ijin } = JSON.parse(it.status_absen);
//                 return [it.key, it.no, it.class, it.name, `masuk: ${masuk} | terlambat: ${terlambat} | alpha: ${alpha} | ijin: ${ijin}`];
//             });

//             return { columns: columnsData, data: mappingGetAllData };
//         } catch (err) {

//         }
//     };

//     await Swal.showLoading();
//     const myData = await findOneDataWithKey();
//     const tableGrid = renderTableGridJs({ limit: 1, columns: myData.columns, data: myData.data, elementId: "swal-table-grid" });
//     await Swal.hideLoading();
// };

// const renderTableGridDownloadDataAbsensWithKey = async (uniqueKey = "") => {
//     const findOneDataWithKey = async () => {
//         try {
//             const findOneDataArr = (await axios.get(`/api/absens/data/${uniqueKey}`)).data;
//             const columnsData = () => {
//                 let forkFindOneData = findOneDataArr[0];
//                 const mapping = Object.keys(forkFindOneData).map((it, index) => {
//                     return { name: it, width: it == "no" ? "90px" : it == "class" ? "150px" : it == "status" ? "140px" : null }
//                 });
//                 return mapping;
//             }

//             const newArrayData = findOneDataArr.map((it) => Object.values(it));
//             return { columns: columnsData(), data: newArrayData };
//         } catch (err) {

//         }
//     };

//     await Swal.showLoading();
//     const myData = await findOneDataWithKey();
//     const tableGrid = renderTableGridJs({ limit: 100, columns: myData.columns, data: myData.data, elementId: "swal-table-grid" });
//     await Swal.hideLoading();
// };

// const updateLimitTableGrid = (limit = "") => {
//     struct_obj.gridjs_init.updateConfig({
//         pagination: {
//             limit: parseInt(limit)
//         }
//     }).forceRender();
//     document.querySelector(".gridjs-head").innerHTML = `<input class="form-control mb-2 gridjs-input" style="width: 130px;" type="number" placeholder="Input Limit Row" value="${limit}" onchange="updateLimitTableGrid(this.value);">`;
//     return true;
// };

// const renderTableGridDownloadDataPersons = async (clas = "", limit = "") => {
//     const getAllDataWithClass = async (_class = "") => {
//         try {
//             const getAllData = (await axios.get(`/api/persons/data/all/class/${_class}`)).data;
//             const reverseGetAllData = getAllData.sort((a, b) => {
//                 if (a.no < b.no) return -1;
//                 if (a.no > b.no) return 1;
//                 return 0;
//             });

//             const columnsData = Object.keys(reverseGetAllData[0]).map((it, index) => {
//                 return { name: it, width: index == 1 ? "90px" : index == 2 ? "150px" : null }
//             });

//             const mappingGetAllData = reverseGetAllData.map((it) => {
//                 const { masuk, terlambat, alpha, ijin } = JSON.parse(it.status_absen);
//                 return [it.key, it.no, it.class, it.name, `masuk: ${masuk} | terlambat: ${terlambat} | alpha: ${alpha} | ijin: ${ijin}`];
//             });

//             return { columns: columnsData, data: mappingGetAllData };
//         } catch (err) {
//             // not handled
//         }
//     };

//     await Swal.showLoading();
//     const { columns, data } = await getAllDataWithClass(clas);
//     const tableGrid = renderTableGridJs({ limit: parseInt(limit), columns, data, elementId: "swal-table-grid" });
//     struct_obj.gridjs_init = tableGrid;

//     document.querySelector(".gridjs-head").innerHTML = `<input class="form-control mb-2 gridjs-input" style="width: 130px;" type="number" placeholder="Input Limit Row" value="${limit}" onchange="updateLimitTableGrid(this.value);">`;

//     eventRowClickGridJs(tableGrid, `${location.href}?download-data?persons`);
//     await Swal.hideLoading();
// };

// const renderTableGridDownloadDataAbsens = async (clas = "", limit = "") => {
//     const getAllData = async (_class) => {
//         try {
//             const getAllData = (await axios.get(`/api/absens/data/all/class/${_class}`)).data
//             const reverseGetAllData = getAllData.sort((a, b) => {
//                 if (a.no < b.no) return -1;
//                 if (a.no > b.no) return 1;
//                 return 0;
//             }).reverse();


//             const columnsData = () => {
//                 let forkReverseGetAllData0 = reverseGetAllData[0];
//                 delete forkReverseGetAllData0.id;
//                 delete forkReverseGetAllData0.message;
//                 const mapping = Object.keys(forkReverseGetAllData0).map((it) => {
//                     return {
//                         name: it,
//                         width: it == "no" ? "90px" : it == "class" ? "150px" : it == "status" ? "140px" : null
//                     }
//                 });
//                 return mapping;
//             }

//             const mappingGetAllData = reverseGetAllData.map((it) => {
//                 return [it.key, it.no, it.class, it.name, it.status, it.created_at];
//             });

//             return { columns: columnsData(), data: mappingGetAllData };
//         } catch (err) {

//         }
//     };

//     await Swal.showLoading();
//     const allData = await getAllData(clas);
//     const tableGrid = renderTableGridJs({ limit: parseInt(limit), columns: allData.columns, data: allData.data, elementId: "swal-table-grid" });
//     struct_obj.gridjs_init = tableGrid;

//     document.querySelector(".gridjs-head").innerHTML = `<input class="form-control mb-2 gridjs-input" style="width: 130px;" type="number" placeholder="Input Limit Row" value="${limit}" onchange="updateLimitTableGrid(this.value);">`;

//     eventRowClickGridJs(tableGrid, `${location.href}?download-data?absens`);
//     await Swal.hideLoading();
// };

// const modalAndTableGridForFindOne = async (funcOnLoad = "", uniqueKey = "") => {
//     const { isConfirmed, value } = await Swal.fire({
//         title: htmlHeaderModal,
//         html: `
//                                 <div id="swal-table-grid"></div>
//                                 <img src="${appLogo}" onload="this.style.display = 'none'; ${funcOnLoad}('${uniqueKey}');">
//                                 <div class="pt-4"></div>
//                                 <button onclick="exportTableToExcel()" class="btn btn-sm btn-secondary" style="font-size: 13px;"><i class="bi bi-card-heading"></i>&nbsp; Download As Excel</button>
//                                 <button onclick="exportTableToImage()" class="btn btn-sm btn-secondary" style="font-size: 13px;"><i class="bi bi-card-image"></i>&nbsp; Download As Image</button>
//                                 <button onclick="exportTableToPrint()" class="btn btn-sm btn-secondary" style="font-size: 13px;"><i class="bi bi-printer-fill"></i>&nbsp; Print To Thermal</button>
//                             `,
//         cancelButtonText: '<i class="bi bi-house-door"></i>&nbsp; Home',
//         showConfirmButton: false,
//         showCancelButton: true,
//         allowOutsideClick: false,
//         width: "100%",
//         showClass: {
//             backdrop: 'swal2-noanimation',
//         },
//         hideClass: {
//             backdrop: 'swal2-noanimation',
//         },
//         footer: htmlFooterModal
//     });

//     if (isConfirmed === false) {
//         location.href = location.origin;
//     }
// };

// const modalMain = async () => {
//     const { isConfirmed, value } = await Swal.fire({
//         title: htmlHeaderModal,
//         input: 'password',
//         inputPlaceholder: 'Input Access Key Main',
//         confirmButtonText: '<i class="bi bi-unlock"></i>&nbsp; Unlock',
//         cancelButtonText: '<i class="bi bi-arrow-left"></i>&nbsp; Back',
//         showCancelButton: true,
//         allowOutsideClick: false,
//         showClass: {
//             backdrop: 'swal2-noanimation',
//         },
//         hideClass: {
//             backdrop: 'swal2-noanimation',
//         },
//         footer: htmlFooterModal,
//         inputValidator: async (value) => {
//             try {
//                 if (value.length == 0) {
//                     return 'Access Key Main Not Valid';
//                 } else {
//                     const postData = (await axios.post("/api/login", { type: "main", key: value })).data;
//                     if (postData.status === false) {
//                         return 'Access Key Main Not Valid';
//                     } else if (postData.status === true) {
//                         await Swal.fire({
//                             title: "Please enable fullview web with click F11",
//                             html: `<img class="p-3" height="100" width="100" src="../assets/css/bootstrap-icons-1.10.3/arrows-fullscreen.svg">`,
//                             showClass: { backdrop: 'swal2-noanimation' },
//                             hideClass: { backdrop: 'swal2-noanimation' },
//                         });

//                         struct_obj.key = value;
//                         struct_obj.time_zone = postData.data.time_zone;
//                         struct_obj.time_absen = postData.data.time_absen;
//                         realtimeJam(struct_obj.time_zone);
//                         document.getElementById("html-main-content").style.display = "";
//                         document.getElementById("card-text-6").textContent = `Jam Masuk : ${struct_obj.time_absen.min_masuk} ~ ${struct_obj.time_absen.max_masuk}`;
//                         document.getElementById("card-text-7").textContent = `Jam Max Terlambat : ${struct_obj.time_absen.max_terlambat}`;
//                         activeAnimationAos();
//                     }
//                 }
//             } catch (err) {
//                 return 'Found error, info: ' + err;
//             }
//         }
//     });

//     if (isConfirmed === false) {
//         modalHome();
//     }
// };

// const modalAdminManager = async () => {
//     const { isConfirmed, value } = await Swal.fire({
//         title: htmlHeaderModal,
//         input: 'password',
//         inputPlaceholder: 'Input Access Key Admin',
//         confirmButtonText: '<i class="bi bi-unlock"></i>&nbsp; Unlock',
//         cancelButtonText: '<i class="bi bi-arrow-left"></i>&nbsp; Back',
//         showCancelButton: true,
//         allowOutsideClick: false,
//         showClass: { backdrop: 'swal2-noanimation' },
//         hideClass: { backdrop: 'swal2-noanimation' },
//         footer: htmlFooterModal,
//         inputValidator: async (value) => {
//             try {
//                 if (value.length == 0) {
//                     return 'Access Key Admin Not Valid';
//                 } else {
//                     const postData = (await axios.post("/api/login", { type: "admin", key: value })).data;
//                     if (postData.status === false) {
//                         return 'Access Key Admin Not Valid';
//                     }
//                 }
//             } catch (err) {
//                 return 'Found error, info: ' + err;
//             }
//         }
//     });

//     // let str = `<button class="btn btn-sm btn-secondary swal2-styled"><i class="bi bi-pencil-square"></i>&nbsp; Create</button>
//     //                 <button class="btn btn-sm btn-secondary swal2-styled"><i class="bi bi-arrow-repeat"></i>&nbsp; Update</button>
//     //                 <button class="btn btn-sm btn-secondary swal2-styled"><i class="bi bi-eraser"></i>&nbsp; Delete</button>`;

//     if (isConfirmed === true) {
//         const { isConfirmed2, value2 } = await Swal.fire({
//             title: htmlHeaderModal,
//             html: `
//                 <div class="swal2-actions">
//                     <button class="btn btn-sm btn-secondary swal2-styled"><i class="bi bi-pencil-square"></i>&nbsp; Create Qrcode</button>
//                     <button class="btn btn-sm btn-secondary swal2-styled"><i class="bi bi-pencil-square"></i>&nbsp; Manager Database</button>
//                 </div> 

//                 <div id="content" class="p-3"></div>
//             `,
//             cancelButtonText: '<i class="bi bi-arrow-left"></i>&nbsp; Back',
//             showConfirmButton: false,
//             showCancelButton: true,
//             width: "100%",
//             showClass: { backdrop: 'swal2-noanimation' },
//             hideClass: { backdrop: 'swal2-noanimation' },
//             footer: htmlFooterModal,
//         });

//         if (isConfirmed2 === true) {
//             // modalHome();
//             if (value2 == 0) {
//                 modalMain();
//             } else if (value2 == 1) {
//                 modalDownloadData()
//             }
//         } else {
//             modalAdminManager();
//         }
//     } else {
//         modalHome();
//     }


//     // const { isConfirmed, value } = await Swal.fire({
//     //     title: htmlHeaderModal,
//     //     html: `
//     //                 <p class="mt-1 card card-body h6 p-4">Coming soon</p>
//     //             `,
//     //     cancelButtonText: '<i class="bi bi-arrow-left"></i>&nbsp; Back',
//     //     showConfirmButton: false,
//     //     showCancelButton: true,
//     //     allowOutsideClick: false,
//     //     showClass: {
//     //         backdrop: 'swal2-noanimation',
//     //     },
//     //     hideClass: {
//     //         backdrop: 'swal2-noanimation',
//     //     },
//     //     footer: htmlFooterModal,
//     // });

//     // if (isConfirmed === false) {
//     //     modalHome();
//     // }
// };

// const modalGeneratePermission = async () => {
//     const { isConfirmed, value } = await Swal.fire({
//         title: htmlHeaderModal,
//         html:
//             `<input id="swal-input-1" class="form-control mb-3 mt-3" placeholder="Key Person Responsible">` +
//             `<input id="swal-input-2" class="form-control mb-3" placeholder="Key Person">` +
//             `<input id="swal-input-3" class="form-control mb-3" placeholder="Message" maxlength="99">`,
//         confirmButtonText: '<i class="bi bi-send"></i>&nbsp; Send',
//         cancelButtonText: '<i class="bi bi-arrow-left"></i>&nbsp; Back',
//         showCancelButton: true,
//         allowOutsideClick: false,
//         showClass: {
//             backdrop: 'swal2-noanimation',
//         },
//         hideClass: {
//             backdrop: 'swal2-noanimation',
//         },
//         footer: htmlFooterModal,
//         preConfirm: async () => {
//             const value = [document.getElementById('swal-input-1').value, document.getElementById('swal-input-2').value, document.getElementById('swal-input-3').value];
//             if (value[0].length != 0 && value[1].length != 0 && value[2].length != 0 && value[2].includes("-") === false) {
//                 await Swal.showLoading();
//                 const postdata = (await axios.post("/api/absens", {
//                     key_main: struct_obj.key,
//                     key_1: value[0],
//                     key_2: value[1],
//                     message: value[2],
//                     status: "ijin",
//                 })).data;

//                 const icon = postdata.status === true ? 'success' : 'error'; // icon = "success";
//                 const message = postdata.message;
//                 const { name, class: clas } = postdata.data === null ? { name: "none", class: "none" } : postdata.data;

//                 const { isConfirmed } = await Swal.fire({
//                     icon: icon,
//                     html: `
//                                 <p class="pt-2 h6">Person Responsible : ${value[0]}</p>
//                                 <p class="pt-2 h6">Person : ${value[1]}</p>
//                                 <p class="pt-2 h6">Message : ${value[2]}</p>
//                                 <p class="pt-2 h6">Info : ${message}. name: ${name}, class: ${clas}</p>
//                             `,
//                     cancelButtonText: '<i class="bi bi-arrow-left"></i>&nbsp; Back',
//                     showCancelButton: true,
//                     showConfirmButton: false,
//                     allowOutsideClick: false,
//                     showClass: {
//                         backdrop: 'swal2-noanimation',
//                     },
//                     hideClass: {
//                         backdrop: 'swal2-noanimation',
//                     },
//                 });

//                 await Swal.hideLoading();

//                 if (isConfirmed === false) {
//                     await modalGeneratePermission();
//                 }
//             } else {
//                 Swal.showValidationMessage(`Must Be Completed`);
//             }
//         },
//     });

//     if (isConfirmed === false) {
//         modalHome();
//     }
// };

// const modalDownloadData = async () => {
//     const getAllClass = async () => {
//         try {
//             const getData = (await axios.get("/api/persons/data/all")).data;
//             const removeDupAndFilter = [...new Set(getData.map((it) => it.class))]
//             return ["ALL", ...removeDupAndFilter.sort()];
//         } catch (err) { }
//     };

//     const { isConfirmed, value } = await Swal.fire({
//         title: htmlHeaderModal,
//         input: 'select',
//         inputOptions: ["😀 Persons", "📆 Absens"],
//         confirmButtonText: '<i class="bi bi-view-list"></i>&nbsp; Open',
//         cancelButtonText: '<i class="bi bi-arrow-left"></i>&nbsp; Back',
//         showCancelButton: true,
//         allowOutsideClick: false,
//         showClass: { backdrop: 'swal2-noanimation' },
//         hideClass: { backdrop: 'swal2-noanimation' },
//         footer: htmlFooterModal,
//     });

//     if (isConfirmed === true) {
//         const areaModal_2_3 = async () => {
//             const arrClassTxt = getAllClass();
//             const { isConfirmed: isConfirmed2, value: value2 } = await Swal.fire({
//                 title: htmlHeaderModal,
//                 input: 'select',
//                 inputOptions: arrClassTxt,
//                 confirmButtonText: '<i class="bi bi-table"></i>&nbsp; View',
//                 cancelButtonText: '<i class="bi bi-arrow-left"></i>&nbsp; Back',
//                 showCancelButton: true,
//                 allowOutsideClick: false,
//                 showClass: { backdrop: 'swal2-noanimation' },
//                 hideClass: { backdrop: 'swal2-noanimation' },
//                 footer: htmlFooterModal,
//             });

//             if (isConfirmed2 === true) {
//                 const classTxt = (await arrClassTxt)[value2];
//                 const funcOnLoad = value == 0 ? "renderTableGridDownloadDataPersons" : value == 1 ? "renderTableGridDownloadDataAbsens" : "";
//                 const { isConfirmed: isConfirmed3 } = await Swal.fire({
//                     title: htmlHeaderModal,
//                     html: `
//                                 <div id="swal-table-grid"></div>
//                                 <img src="${appLogo}" onload="this.style.display = 'none'; ${funcOnLoad}('${classTxt}', '100');">

//                                 <div class="pt-3"></div>

//                                 <div class="swal2-actions">
//                                     <button onclick="exportTableToExcel()" style="font-size: 13px;" class="btn btn-sm btn-secondary swal2-styled"><i class="bi bi-card-heading"></i>&nbsp; Download As Excel</button>
//                                     <button onclick="exportTableToImage()" style="font-size: 13px;" class="btn btn-sm btn-secondary swal2-styled"><i class="bi bi-card-image"></i>&nbsp; Download As Image</button>
//                                     <button onclick="exportTableToPrint()" class="btn btn-sm btn-secondary swal2-styled" style="font-size: 13px;"><i class="bi bi-printer-fill"></i>&nbsp; Print To Thermal</button>
//                                 </div>

//                                 <div class="pt-1"></div>
//                             `,
//                     cancelButtonText: '<i class="bi bi-arrow-left"></i>&nbsp; Back',
//                     showConfirmButton: false,
//                     showCancelButton: true,
//                     allowOutsideClick: false,
//                     width: "100%",
//                     showClass: { backdrop: 'swal2-noanimation' },
//                     hideClass: { backdrop: 'swal2-noanimation' },
//                     footer: htmlFooterModal
//                 });

//                 if (isConfirmed3 === false) {
//                     areaModal_2_3();
//                 }

//             } else {
//                 modalDownloadData();
//             }
//         };

//         areaModal_2_3();
//     } else {
//         modalHome();
//     }
// };

// const modalAbout = async () => {
//     const { isConfirmed, value } = await Swal.fire({
//         title: htmlHeaderModal,
//         html: `
//             <div class="card">
//                 <div class="card-body">
//                     <p class="h6 p-4">Website ini di generate automatis dengan software ${scriptinfo.name} V${scriptinfo.version} dan di buat oleh author ${scriptinfo.author}</p>

//                     <div class="swal2-actions">
//                         <button style="font-size: 0.8em !important;" class="pt-1 pb-1 btn btn-sm btn-secondary swal2-styled" onclick="location.href='${scriptinfo.url}'"><i class="bi bi-github fs-6"></i>&nbsp; Github</button>
//                         <button style="font-size: 0.8em !important;" class="pt-1 pb-1 btn btn-sm btn-secondary swal2-styled" onclick="location.href='${scriptinfo.author_url}'"><i class="bi bi-person-circle fs-6"></i>&nbsp; Author</button>
//                         <button style="font-size: 0.8em !important;" class="pt-1 pb-1 btn btn-sm btn-secondary swal2-styled" onclick="location.href='${scriptinfo.author_url}'"><i class="bi bi-youtube fs-6"></i>&nbsp; Youtube</button>
//                     </div>

//                     <p class="h6"><br><br><br>copyright@2023 - All Right Rerserved</p>
//                 </div>
//             </div>
//             <div class="pb-1"></div>
//                 `,
//         cancelButtonText: '<i class="bi bi-arrow-left"></i>&nbsp; Back',
//         showConfirmButton: false,
//         showCancelButton: true,
//         allowOutsideClick: false,
//         showClass: { backdrop: 'swal2-noanimation' },
//         hideClass: { backdrop: 'swal2-noanimation' },
//         footer: htmlFooterModal,
//     });

//     if (isConfirmed === false) {
//         modalHome();
//     }
// };

// const modalHome = async () => {
//     const { isConfirmed, value } = await Swal.fire({
//         title: htmlHeaderModal,
//         input: 'select',
//         inputOptions: ["💻 Main", "🗳️ Generate Permission", "💾 Download Data", "🌐 About"],
//         confirmButtonText: '<i class="bi bi-view-list"></i>&nbsp; Open',
//         showCancelButton: false,
//         allowOutsideClick: false,
//         showClass: { backdrop: 'swal2-noanimation' },
//         hideClass: { backdrop: 'swal2-noanimation' },
//         footer: htmlFooterModal
//     });

//     if (isConfirmed === true) {
//         if (value == 0) {
//             modalMain();
//         } else if (value == 1) {
//             modalGeneratePermission(); // modalAdminManager();
//         } else if (value == 2) {
//             modalDownloadData();
//         } else if (value == 3) {
//             modalAbout();
//         }
//     }
// };

// const exportTableToImage = () => {
//     let filename = "datatable" + ".jpeg";
//     let downloadLink = document.createElement("a");
//     html2canvas(document.querySelector(".gridjs-wrapper"), {
//         onrendered: function (canvas) {
//             downloadLink.href = canvas.toDataURL("image/png"); // create a link to the file
//             downloadLink.download = filename; // setting the file name
//             downloadLink.click(); // triggering the function
//             console.clear();
//         }
//     });
// };

// const exportTableToExcel = () => {
//     let downloadLink;
//     let filename = 'datatable' + '.xls';
//     let dataType = 'application/vnd.ms-excel';
//     let tableSelect = document.querySelector(".gridjs-table");
//     let tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');

//     // Create download link element
//     downloadLink = document.createElement("a");
//     document.body.appendChild(downloadLink);
//     if (navigator.msSaveOrOpenBlob) {
//         let blob = new Blob(['\ufeff', tableHTML], { type: dataType });
//         navigator.msSaveOrOpenBlob(blob, filename);
//     } else {
//         downloadLink.href = 'data:' + dataType + ', ' + tableHTML; // create a link to the file
//         downloadLink.download = filename; // setting the file name
//         downloadLink.click(); // triggering the function
//     }
// };

// const exportTableToPrint = () => {
//     document.body.scrollTop = 0; // For Safari
//     document.querySelector(`.swal2-popup`).scrollTop
//     document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
//     window.print();
// };

// document.addEventListener("keyup", async (event) => {
//     const isMainReady = document.getElementById("html-main-content").style.display == "none" ? false : true;
//     console.log("isMainReady", isMainReady);
//     if (isMainReady === true) {
//         if (event.key == "Enter") {
//             if (parseInt(struct_obj.keyup_text) !== NaN && struct_obj.keyup_text_temporary != struct_obj.keyup_text) {
//                 const textStatusAbsenScan = document.getElementById("card-text-4");
//                 const textStatusAbsenScanLog = document.getElementById("card-text-8");
//                 if (struct_obj.status_absen != "ALPHA") {
//                     const postdata = (await axios.post("/api/absens", {
//                         key_main: struct_obj.key,
//                         key_1: "",
//                         key_2: struct_obj.keyup_text,
//                         message: struct_obj.status_absen.toLowerCase(),
//                         status: struct_obj.status_absen.toLowerCase()
//                     })).data;
//                     if (postdata.status === true) {
//                         const { name, class: clas } = postdata.data;
//                         textStatusAbsenScanLog.textContent = textStatusAbsenScanLog.textContent + "\n" + `[ ${getJam()} ]  success absen with status ${struct_obj.status_absen}. name: ${name}, class: ${clas}`;
//                         if (struct_obj.status_absen == "MASUK") {
//                             const textStatusAbsenJumlahMasuk = document.getElementById("card-text-9");
//                             struct_obj.absen.count_masuk += 1;
//                             textStatusAbsenJumlahMasuk.textContent = "MASUK : " + struct_obj.absen.count_masuk;
//                         } else if (struct_obj.status_absen == "TERLAMBAT") {
//                             const textStatusAbsenJumlahTerlambat = document.getElementById("card-text-10");
//                             struct_obj.absen.count_terlambat += 1;
//                             textStatusAbsenJumlahTerlambat.textContent = "TERLAMBAT : " + struct_obj.absen.count_terlambat;
//                         }
//                         textStatusAbsenScan.textContent = `${struct_obj.keyup_text} ${struct_obj.status_absen}`;
//                         textStatusAbsenScanLog.scrollTop = textStatusAbsenScanLog.scrollHeight;
//                     } else {
//                         textStatusAbsenScanLog.textContent = textStatusAbsenScanLog.textContent + "\n" + `[ ${getJam()} ]  failed absen, info: ${postdata.message}`;
//                         textStatusAbsenScan.textContent = `${struct_obj.keyup_text} GAGAL`;
//                         textStatusAbsenScanLog.scrollTop = textStatusAbsenScanLog.scrollHeight;
//                     }
//                 } else {
//                     textStatusAbsenScanLog.textContent = textStatusAbsenScanLog.textContent + "\n" + `[ ${getJam()} ]  CANNOT SCAN DUE TO ALPHA ABSENT STATUS`;
//                     textStatusAbsenScanLog.scrollTop = textStatusAbsenScanLog.scrollHeight;
//                 }

//                 struct_obj.keyup_text_temporary = struct_obj.keyup_text;
//                 struct_obj.keyup_text = "";
//             } else {
//                 struct_obj.keyup_text = "";
//             }
//         } else {
//             const key = event.key;
//             const textAllow = "abcdefghijklmnopqrstuvwxyz0123456789";
//             if (textAllow.toUpperCase().includes(key) === true || textAllow.includes(key) === true) {
//                 struct_obj.keyup_text += event.key;
//             }
//         }
//     }
// });

// const searchQuery = window.location.search;
// if (searchQuery == "?main") {
//     modalDownloadData();
// } else if (searchQuery == "?download-data") {
//     modalDownloadData();
// } else if (searchQuery == "?generate-permission") {
//     modalGeneratePermission();
// } else if (searchQuery == "?about") {
//     modalAbout();
// } else if (searchQuery.includes("?download-data?persons?")) {
//     const uniqueKey = searchQuery.split("persons?")[1];
//     modalAndTableGridForFindOne("renderTableGridDownloadDataPersonsWithKey", uniqueKey);
// } else if (searchQuery.includes("?download-data?absens?")) {
//     const uniqueKey = searchQuery.split("absens?")[1];
//     modalAndTableGridForFindOne("renderTableGridDownloadDataAbsensWithKey", uniqueKey);
// } else {
//     modalHome();
// }


// const getAllDataWithClass = async (_class = "") => {
//     try {
//         const getAllData = (await axios.get(`/api/persons/data/all/class/${_class}`)).data;
//         const reverseGetAllData = getAllData.sort((a, b) => {
//             if (a.no < b.no) return -1;
//             if (a.no > b.no) return 1;
//             return 0;
//         });

//         const columnsData = Object.keys(reverseGetAllData[0]).map((it, index) => {
//             return { name: it, width: index == 1 ? "90px" : index == 2 ? "150px" : null }
//         });

//         const mappingGetAllData = reverseGetAllData.map((it) => {
//             const { masuk, terlambat, alpha, ijin } = JSON.parse(it.status_absen);
//             return [it.key, it.no, it.class, it.name, `masuk: ${masuk} | terlambat: ${terlambat} | alpha: ${alpha} | ijin: ${ijin}`];
//         });

//         return { columns: columnsData, data: mappingGetAllData };
//     } catch (err) {
//         // not handled
//     }
// };


const appLogo = document.querySelector("link").href; let htmlHeaderModal = `<div class="pt-4"></div><img src="${appLogo}" width="135" height="155" class="d-inline-block align-text-top"><p class="pt-3" style="font-size: 25px;">${appName}</p>`, htmlFooterModal = `<div class="text-center"><p onclick="location.href = 'https://www.instagram.com/${scriptinfo.author_instagram.slice(1)}'" style="font-size: 14px;" class="pt-3">❤ Created by ${scriptinfo.author}</p></div>`, struct_obj = { keyup_text: "", keyup_text_temporary: "", key: "", status_absen: "", time_zone: "", time_absen: { min_masuk: "", max_masuk: "", max_terlambat: "" }, absen: { count_masuk: 0, count_terlambat: 0 }, gridjs_init: {} }; const activeAnimationAos = () => { AOS.init({ duration: "3000", easing: "Linear" }) }, getJam = () => (dayjs.extend(window.dayjs_plugin_utc), dayjs.extend(window.dayjs_plugin_timezone), dayjs.utc().tz(struct_obj.time_zone).format("HH:mm:ss")), realtimeJam = (t = "") => { const a = document.getElementById("card-text-3"), e = document.getElementById("card-text-5"); setInterval((() => { const t = getJam(); a.textContent = t; let n = ""; n = t >= struct_obj.time_absen.min_masuk && t <= struct_obj.time_absen.max_masuk ? "MASUK" : t >= struct_obj.time_absen.max_masuk && t <= struct_obj.time_absen.max_terlambat ? "TERLAMBAT" : "ALPHA", struct_obj.status_absen = n, e.textContent = `Status Absen : ${n}` }), 1e3) }, renderTableGridJs = ({ limit: t = 0, columns: a = [], data: e = [], elementId: n = "" }) => new gridjs.Grid({ width: "100", sort: !0, autoWidth: !1, fixedHeader: !0, pagination: { enabled: !0, limit: t }, search: { enabled: !0 }, style: { table: { "white-space": "nowrap" }, th: { "text-align": "center" }, td: { "text-align": "center", "font-size": "1.04rem" } }, columns: a, data: e }).render(document.getElementById(n)), getConfigGridJsTable = ({ limit: t = 0, columns: a = [], data: e = [] }) => ({ width: "100", sort: !0, autoWidth: !1, fixedHeader: !0, pagination: { enabled: !0, limit: t }, search: { enabled: !0 }, style: { table: { "white-space": "nowrap" }, th: { "text-align": "center" }, td: { "text-align": "center", "font-size": "1.05rem" } }, columns: a, data: e }), eventRowClickGridJs = (t = {}, a = "") => { t.on("rowClick", ((...t) => { const e = t[1]._cells[0].data, n = `${a}?${e}`; navigator.clipboard.writeText(n) })) }, renderTableGridDownloadDataPersonsWithKey = async (t = "") => { await Swal.showLoading(); const a = await (async () => { try { const a = (await axios.get(`/api/persons/data/${t}`)).data, e = Object.keys(a).map(((t, a) => ({ name: t, width: 1 == a ? "90px" : 2 == a ? "150px" : null }))); return { columns: e, data: [a].map((t => { const { masuk: a, terlambat: e, alpha: n, ijin: s } = JSON.parse(t.status_absen); return [t.key, t.no, t.class, t.name, `masuk: ${a} | terlambat: ${e} | alpha: ${n} | ijin: ${s}`] })) } } catch (t) { } })(); renderTableGridJs({ limit: 1, columns: a.columns, data: a.data, elementId: "swal-table-grid" }); await Swal.hideLoading() }, renderTableGridDownloadDataAbsensWithKey = async (t = "") => { await Swal.showLoading(); const a = await (async () => { try { const a = (await axios.get(`/api/absens/data/${t}`)).data, e = () => { let t = a[0]; return Object.keys(t).map(((t, a) => ({ name: t, width: "no" == t ? "90px" : "class" == t ? "150px" : "status" == t ? "140px" : null }))) }, n = a.map((t => Object.values(t))); return { columns: e(), data: n } } catch (t) { } })(); renderTableGridJs({ limit: 100, columns: a.columns, data: a.data, elementId: "swal-table-grid" }); await Swal.hideLoading() }, updateLimitTableGrid = (t = "") => (struct_obj.gridjs_init.updateConfig({ pagination: { limit: parseInt(t) } }).forceRender(), document.querySelector(".gridjs-head").innerHTML = `<input class="form-control mb-2 gridjs-input" style="width: 130px;" type="number" placeholder="Input Limit Row" value="${t}" onchange="updateLimitTableGrid(this.value);">`, !0), renderTableGridDownloadDataPersons = async (t = "", a = "") => { await Swal.showLoading(); const { columns: e, data: n } = await (async (t = "") => { try { const a = (await axios.get(`/api/persons/data/all/class/${t}`)).data.sort(((t, a) => t.no < a.no ? -1 : t.no > a.no ? 1 : 0)), e = Object.keys(a[0]).map(((t, a) => ({ name: t, width: 1 == a ? "90px" : 2 == a ? "150px" : null }))); return { columns: e, data: a.map((t => { const { masuk: a, terlambat: e, alpha: n, ijin: s } = JSON.parse(t.status_absen); return [t.key, t.no, t.class, t.name, `masuk: ${a} | terlambat: ${e} | alpha: ${n} | ijin: ${s}`] })) } } catch (t) { } })(t), s = renderTableGridJs({ limit: parseInt(a), columns: e, data: n, elementId: "swal-table-grid" }); struct_obj.gridjs_init = s, document.querySelector(".gridjs-head").innerHTML = `<input class="form-control mb-2 gridjs-input" style="width: 130px;" type="number" placeholder="Input Limit Row" value="${a}" onchange="updateLimitTableGrid(this.value);">`, eventRowClickGridJs(s, `${location.href}?download-data?persons`), await Swal.hideLoading() }, renderTableGridDownloadDataAbsens = async (t = "", a = "") => { await Swal.showLoading(); const e = await (async t => { try { const a = (await axios.get(`/api/absens/data/all/class/${t}`)).data.sort(((t, a) => t.no < a.no ? -1 : t.no > a.no ? 1 : 0)).reverse(), e = () => { let t = a[0]; delete t.id, delete t.message; return Object.keys(t).map((t => ({ name: t, width: "no" == t ? "90px" : "class" == t ? "150px" : "status" == t ? "140px" : null }))) }, n = a.map((t => [t.key, t.no, t.class, t.name, t.status, t.created_at])); return { columns: e(), data: n } } catch (t) { } })(t), n = renderTableGridJs({ limit: parseInt(a), columns: e.columns, data: e.data, elementId: "swal-table-grid" }); struct_obj.gridjs_init = n, document.querySelector(".gridjs-head").innerHTML = `<input class="form-control mb-2 gridjs-input" style="width: 130px;" type="number" placeholder="Input Limit Row" value="${a}" onchange="updateLimitTableGrid(this.value);">`, eventRowClickGridJs(n, `${location.href}?download-data?absens`), await Swal.hideLoading() }, modalAndTableGridForFindOne = async (t = "", a = "") => { const { isConfirmed: e, value: n } = await Swal.fire({ title: htmlHeaderModal, html: `\n                                <div id="swal-table-grid"></div>\n                                <img src="${appLogo}" onload="this.style.display = 'none'; ${t}('${a}');">\n                                <div class="pt-4"></div>\n                                <button onclick="exportTableToExcel()" class="btn btn-sm btn-secondary" style="font-size: 13px;"><i class="bi bi-card-heading"></i>&nbsp; Download As Excel</button>\n                                <button onclick="exportTableToImage()" class="btn btn-sm btn-secondary" style="font-size: 13px;"><i class="bi bi-card-image"></i>&nbsp; Download As Image</button>\n                                <button onclick="exportTableToPrint()" class="btn btn-sm btn-secondary" style="font-size: 13px;"><i class="bi bi-printer-fill"></i>&nbsp; Print To Thermal</button>\n                            `, cancelButtonText: '<i class="bi bi-house-door"></i>&nbsp; Home', showConfirmButton: !1, showCancelButton: !0, allowOutsideClick: !1, width: "100%", showClass: { backdrop: "swal2-noanimation" }, hideClass: { backdrop: "swal2-noanimation" }, footer: htmlFooterModal }); !1 === e && (location.href = location.origin) }, modalMain = async () => { const { isConfirmed: t, value: a } = await Swal.fire({ title: htmlHeaderModal, input: "password", inputPlaceholder: "Input Access Key Main", confirmButtonText: '<i class="bi bi-unlock"></i>&nbsp; Unlock', cancelButtonText: '<i class="bi bi-arrow-left"></i>&nbsp; Back', showCancelButton: !0, allowOutsideClick: !1, showClass: { backdrop: "swal2-noanimation" }, hideClass: { backdrop: "swal2-noanimation" }, footer: htmlFooterModal, inputValidator: async t => { try { if (0 == t.length) return "Access Key Main Not Valid"; { const a = (await axios.post("/api/login", { type: "main", key: t })).data; if (!1 === a.status) return "Access Key Main Not Valid"; !0 === a.status && (await Swal.fire({ title: "Please enable fullview web with click F11", html: '<img class="p-3" height="100" width="100" src="../assets/css/bootstrap-icons-1.10.3/arrows-fullscreen.svg">', showClass: { backdrop: "swal2-noanimation" }, hideClass: { backdrop: "swal2-noanimation" } }), struct_obj.key = t, struct_obj.time_zone = a.data.time_zone, struct_obj.time_absen = a.data.time_absen, realtimeJam(struct_obj.time_zone), document.getElementById("html-main-content").style.display = "", document.getElementById("card-text-6").textContent = `Jam Masuk : ${struct_obj.time_absen.min_masuk} ~ ${struct_obj.time_absen.max_masuk}`, document.getElementById("card-text-7").textContent = `Jam Max Terlambat : ${struct_obj.time_absen.max_terlambat}`, AOS.init({ duration: "3000", easing: "Linear" })) } } catch (t) { return "Found error, info: " + t } } }); !1 === t && modalHome() }, modalAdminManager = async () => { const { isConfirmed: t, value: a } = await Swal.fire({ title: htmlHeaderModal, input: "password", inputPlaceholder: "Input Access Key Admin", confirmButtonText: '<i class="bi bi-unlock"></i>&nbsp; Unlock', cancelButtonText: '<i class="bi bi-arrow-left"></i>&nbsp; Back', showCancelButton: !0, allowOutsideClick: !1, showClass: { backdrop: "swal2-noanimation" }, hideClass: { backdrop: "swal2-noanimation" }, footer: htmlFooterModal, inputValidator: async t => { try { if (0 == t.length) return "Access Key Admin Not Valid"; if (!1 === (await axios.post("/api/login", { type: "admin", key: t })).data.status) return "Access Key Admin Not Valid" } catch (t) { return "Found error, info: " + t } } }); if (!0 === t) { const { isConfirmed2: t, value2: a } = await Swal.fire({ title: htmlHeaderModal, html: '\n                <div class="swal2-actions">\n                    <button class="btn btn-sm btn-secondary swal2-styled"><i class="bi bi-pencil-square"></i>&nbsp; Create Qrcode</button>\n                    <button class="btn btn-sm btn-secondary swal2-styled"><i class="bi bi-pencil-square"></i>&nbsp; Manager Database</button>\n                </div> \n                \n                <div id="content" class="p-3"></div>\n            ', cancelButtonText: '<i class="bi bi-arrow-left"></i>&nbsp; Back', showConfirmButton: !1, showCancelButton: !0, width: "100%", showClass: { backdrop: "swal2-noanimation" }, hideClass: { backdrop: "swal2-noanimation" }, footer: htmlFooterModal }); !0 === t ? 0 == a ? modalMain() : 1 == a && modalDownloadData() : modalAdminManager() } else modalHome() }, modalGeneratePermission = async () => { const { isConfirmed: t, value: a } = await Swal.fire({ title: htmlHeaderModal, html: '<input id="swal-input-1" class="form-control mb-3 mt-3" placeholder="Key Person Responsible"><input id="swal-input-2" class="form-control mb-3" placeholder="Key Person"><input id="swal-input-3" class="form-control mb-3" placeholder="Message" maxlength="99">', confirmButtonText: '<i class="bi bi-send"></i>&nbsp; Send', cancelButtonText: '<i class="bi bi-arrow-left"></i>&nbsp; Back', showCancelButton: !0, allowOutsideClick: !1, showClass: { backdrop: "swal2-noanimation" }, hideClass: { backdrop: "swal2-noanimation" }, footer: htmlFooterModal, preConfirm: async () => { const t = [document.getElementById("swal-input-1").value, document.getElementById("swal-input-2").value, document.getElementById("swal-input-3").value]; if (0 != t[0].length && 0 != t[1].length && 0 != t[2].length && !1 === t[2].includes("-")) { await Swal.showLoading(); const a = (await axios.post("/api/absens", { key_main: struct_obj.key, key_1: t[0], key_2: t[1], message: t[2], status: "ijin" })).data, e = !0 === a.status ? "success" : "error", n = a.message, { name: s, class: o } = null === a.data ? { name: "none", class: "none" } : a.data, { isConfirmed: i } = await Swal.fire({ icon: e, html: `\n                                <p class="pt-2 h6">Person Responsible : ${t[0]}</p>\n                                <p class="pt-2 h6">Person : ${t[1]}</p>\n                                <p class="pt-2 h6">Message : ${t[2]}</p>\n                                <p class="pt-2 h6">Info : ${n}. name: ${s}, class: ${o}</p>\n                            `, cancelButtonText: '<i class="bi bi-arrow-left"></i>&nbsp; Back', showCancelButton: !0, showConfirmButton: !1, allowOutsideClick: !1, showClass: { backdrop: "swal2-noanimation" }, hideClass: { backdrop: "swal2-noanimation" } }); await Swal.hideLoading(), !1 === i && await modalGeneratePermission() } else Swal.showValidationMessage("Must Be Completed") } }); !1 === t && modalHome() }, modalDownloadData = async () => { const { isConfirmed: t, value: a } = await Swal.fire({ title: htmlHeaderModal, input: "select", inputOptions: ["😀 Persons", "📆 Absens"], confirmButtonText: '<i class="bi bi-view-list"></i>&nbsp; Open', cancelButtonText: '<i class="bi bi-arrow-left"></i>&nbsp; Back', showCancelButton: !0, allowOutsideClick: !1, showClass: { backdrop: "swal2-noanimation" }, hideClass: { backdrop: "swal2-noanimation" }, footer: htmlFooterModal }); if (!0 === t) { const t = async () => { const e = (async () => { try { const t = (await axios.get("/api/persons/data/all")).data; return ["ALL", ...[...new Set(t.map((t => t.class)))].sort()] } catch (t) { } })(), { isConfirmed: n, value: s } = await Swal.fire({ title: htmlHeaderModal, input: "select", inputOptions: e, confirmButtonText: '<i class="bi bi-table"></i>&nbsp; View', cancelButtonText: '<i class="bi bi-arrow-left"></i>&nbsp; Back', showCancelButton: !0, allowOutsideClick: !1, showClass: { backdrop: "swal2-noanimation" }, hideClass: { backdrop: "swal2-noanimation" }, footer: htmlFooterModal }); if (!0 === n) { const n = (await e)[s], o = 0 == a ? "renderTableGridDownloadDataPersons" : 1 == a ? "renderTableGridDownloadDataAbsens" : "", { isConfirmed: i } = await Swal.fire({ title: htmlHeaderModal, html: `\n                                <div id="swal-table-grid"></div>\n                                <img src="${appLogo}" onload="this.style.display = 'none'; ${o}('${n}', '100');">\n                                \n                                <div class="pt-3"></div>\n\n                                <div class="swal2-actions">\n                                    <button onclick="exportTableToExcel()" style="font-size: 13px;" class="btn btn-sm btn-secondary swal2-styled"><i class="bi bi-card-heading"></i>&nbsp; Download As Excel</button>\n                                    <button onclick="exportTableToImage()" style="font-size: 13px;" class="btn btn-sm btn-secondary swal2-styled"><i class="bi bi-card-image"></i>&nbsp; Download As Image</button>\n                                    <button onclick="exportTableToPrint()" class="btn btn-sm btn-secondary swal2-styled" style="font-size: 13px;"><i class="bi bi-printer-fill"></i>&nbsp; Print To Thermal</button>\n                                </div>\n\n                                <div class="pt-1"></div>\n                            `, cancelButtonText: '<i class="bi bi-arrow-left"></i>&nbsp; Back', showConfirmButton: !1, showCancelButton: !0, allowOutsideClick: !1, width: "100%", showClass: { backdrop: "swal2-noanimation" }, hideClass: { backdrop: "swal2-noanimation" }, footer: htmlFooterModal }); !1 === i && t() } else modalDownloadData() }; t() } else modalHome() }, modalAbout = async () => { const { isConfirmed: t, value: a } = await Swal.fire({ title: htmlHeaderModal, html: `\n            <div class="card">\n                <div class="card-body">\n                    <p class="h6 p-4">Website ini di generate automatis dengan software ${scriptinfo.name} V${scriptinfo.version} dan di buat oleh author ${scriptinfo.author}</p>\n\n                    <div class="swal2-actions">\n                        <button style="font-size: 0.8em !important;" class="pt-1 pb-1 btn btn-sm btn-secondary swal2-styled" onclick="location.href='${scriptinfo.url}'"><i class="bi bi-github fs-6"></i>&nbsp; Github</button>\n                        <button style="font-size: 0.8em !important;" class="pt-1 pb-1 btn btn-sm btn-secondary swal2-styled" onclick="location.href='${scriptinfo.author_url}'"><i class="bi bi-person-circle fs-6"></i>&nbsp; Author</button>\n                        <button style="font-size: 0.8em !important;" class="pt-1 pb-1 btn btn-sm btn-secondary swal2-styled" onclick="location.href='${scriptinfo.author_url}'"><i class="bi bi-youtube fs-6"></i>&nbsp; Youtube</button>\n                    </div>\n\n                    <p class="h6"><br><br><br>copyright@2023 - All Right Rerserved</p>\n                </div>\n            </div>\n            <div class="pb-1"></div>\n                `, cancelButtonText: '<i class="bi bi-arrow-left"></i>&nbsp; Back', showConfirmButton: !1, showCancelButton: !0, allowOutsideClick: !1, showClass: { backdrop: "swal2-noanimation" }, hideClass: { backdrop: "swal2-noanimation" }, footer: htmlFooterModal }); !1 === t && modalHome() }, modalHome = async () => { const { isConfirmed: t, value: a } = await Swal.fire({ title: htmlHeaderModal, input: "select", inputOptions: ["💻 Main", "🗳️ Generate Permission", "💾 Download Data", "🌐 About"], confirmButtonText: '<i class="bi bi-view-list"></i>&nbsp; Open', showCancelButton: !1, allowOutsideClick: !1, showClass: { backdrop: "swal2-noanimation" }, hideClass: { backdrop: "swal2-noanimation" }, footer: htmlFooterModal }); !0 === t && (0 == a ? modalMain() : 1 == a ? modalGeneratePermission() : 2 == a ? modalDownloadData() : 3 == a && modalAbout()) }, exportTableToImage = () => { let t = document.createElement("a"); html2canvas(document.querySelector(".gridjs-wrapper"), { onrendered: function (a) { t.href = a.toDataURL("image/png"), t.download = "datatable.jpeg", t.click(), console.clear() } }) }, exportTableToExcel = () => { let t, a = "datatable.xls", e = "application/vnd.ms-excel", n = document.querySelector(".gridjs-table").outerHTML.replace(/ /g, "%20"); if (t = document.createElement("a"), document.body.appendChild(t), navigator.msSaveOrOpenBlob) { let t = new Blob(["\ufeff", n], { type: e }); navigator.msSaveOrOpenBlob(t, a) } else t.href = "data:" + e + ", " + n, t.download = a, t.click() }, exportTableToPrint = () => { document.body.scrollTop = 0, document.querySelector(".swal2-popup").scrollTop, document.documentElement.scrollTop = 0, window.print() }; document.addEventListener("keyup", (async t => { const a = "none" != document.getElementById("html-main-content").style.display; if (console.log("isMainReady", a), !0 === a) if ("Enter" == t.key) if (NaN !== parseInt(struct_obj.keyup_text) && struct_obj.keyup_text_temporary != struct_obj.keyup_text) { const t = document.getElementById("card-text-4"), a = document.getElementById("card-text-8"); if ("ALPHA" != struct_obj.status_absen) { const e = (await axios.post("/api/absens", { key_main: struct_obj.key, key_1: "", key_2: struct_obj.keyup_text, message: struct_obj.status_absen.toLowerCase(), status: struct_obj.status_absen.toLowerCase() })).data; if (!0 === e.status) { const { name: n, class: s } = e.data; if (a.textContent = a.textContent + "\n" + `[ ${getJam()} ]  success absen with status ${struct_obj.status_absen}. name: ${n}, class: ${s}`, "MASUK" == struct_obj.status_absen) { const t = document.getElementById("card-text-9"); struct_obj.absen.count_masuk += 1, t.textContent = "MASUK : " + struct_obj.absen.count_masuk } else if ("TERLAMBAT" == struct_obj.status_absen) { const t = document.getElementById("card-text-10"); struct_obj.absen.count_terlambat += 1, t.textContent = "TERLAMBAT : " + struct_obj.absen.count_terlambat } t.textContent = `${struct_obj.keyup_text} ${struct_obj.status_absen}`, a.scrollTop = a.scrollHeight } else a.textContent = a.textContent + "\n" + `[ ${getJam()} ]  failed absen, info: ${e.message}`, t.textContent = `${struct_obj.keyup_text} GAGAL`, a.scrollTop = a.scrollHeight } else a.textContent = a.textContent + "\n" + `[ ${getJam()} ]  CANNOT SCAN DUE TO ALPHA ABSENT STATUS`, a.scrollTop = a.scrollHeight; struct_obj.keyup_text_temporary = struct_obj.keyup_text, struct_obj.keyup_text = "" } else struct_obj.keyup_text = ""; else { const a = t.key, e = "abcdefghijklmnopqrstuvwxyz0123456789"; !0 !== e.toUpperCase().includes(a) && !0 !== e.includes(a) || (struct_obj.keyup_text += t.key) } })); const searchQuery = window.location.search; if ("?main" == searchQuery) modalDownloadData(); else if ("?download-data" == searchQuery) modalDownloadData(); else if ("?generate-permission" == searchQuery) modalGeneratePermission(); else if ("?about" == searchQuery) modalAbout(); else if (searchQuery.includes("?download-data?persons?")) { modalAndTableGridForFindOne("renderTableGridDownloadDataPersonsWithKey", searchQuery.split("persons?")[1]) } else if (searchQuery.includes("?download-data?absens?")) { modalAndTableGridForFindOne("renderTableGridDownloadDataAbsensWithKey", searchQuery.split("absens?")[1]) } else modalHome(); const getAllDataWithClass = async (t = "") => { try { const a = (await axios.get(`/api/persons/data/all/class/${t}`)).data.sort(((t, a) => t.no < a.no ? -1 : t.no > a.no ? 1 : 0)), e = Object.keys(a[0]).map(((t, a) => ({ name: t, width: 1 == a ? "90px" : 2 == a ? "150px" : null }))); return { columns: e, data: a.map((t => { const { masuk: a, terlambat: e, alpha: n, ijin: s } = JSON.parse(t.status_absen); return [t.key, t.no, t.class, t.name, `masuk: ${a} | terlambat: ${e} | alpha: ${n} | ijin: ${s}`] })) } } catch (t) { } };