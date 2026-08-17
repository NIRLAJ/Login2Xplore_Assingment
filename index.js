var jpdbBaseURL = "http://api.login2explore.com:5577";
var jpdbIRL = "/api/irl";
var jpdbIML = "/api/iml";

var studentDBName = "SCHOOL-DB";
var studentRelationName = "STUDENT-TABLE";


$(document).ready(function () {
    resetForm();
});


function setStudentFieldsDisabled(disabled) {
    $("#fullName").prop("disabled", disabled);
    $("#studentClass").prop("disabled", disabled);
    $("#birthDate").prop("disabled", disabled);
    $("#address").prop("disabled", disabled);
    $("#enrollmentDate").prop("disabled", disabled);
}


function getRollNoAsJsonObj() {
    var rollNo = $("#rollNo").val().trim();

    var jsonStr = {
        "Roll-No": rollNo
    };

    return JSON.stringify(jsonStr);
}


function saveRecNo2LS(jsonObj) {
    var data = JSON.parse(jsonObj.data);
    localStorage.setItem("recno", data.rec_no);
}


function getStudent() {
    var rollNo = $("#rollNo").val().trim();

    if (rollNo === "") {
        alert("Roll No is required.");
        $("#rollNo").focus();
        return;
    }

    var rollNoJsonObj = getRollNoAsJsonObj();

    var getRequest = createGET_BY_KEYRequest(
        connToken,
        studentDBName,
        studentRelationName,
        rollNoJsonObj
    );

    jQuery.ajaxSetup({ async: false });

    var resultObj = executeCommandAtGivenBaseUrl(
        getRequest,
        jpdbBaseURL,
        jpdbIRL
    );

    jQuery.ajaxSetup({ async: true });

    if (resultObj.status === 400) {
        setStudentFieldsDisabled(false);

        $("#save").prop("disabled", false);
        $("#update").prop("disabled", true);
        $("#reset").prop("disabled", false);

        $("#fullName").focus();
        return;
    }

    if (resultObj.status === 200) {
        fillStudentData(resultObj);

        $("#rollNo").prop("disabled", true);

        setStudentFieldsDisabled(false);

        $("#save").prop("disabled", true);
        $("#update").prop("disabled", false);
        $("#reset").prop("disabled", false);

        $("#fullName").focus();
        return;
    }

    alert("Unable to check Roll No. Please verify the JPDB token and connection.");
    console.log(resultObj);
}


function fillStudentData(jsonObj) {
    saveRecNo2LS(jsonObj);

    var data = JSON.parse(jsonObj.data).record;

    $("#rollNo").val(data["Roll-No"]);
    $("#fullName").val(data["Full-Name"]);
    $("#studentClass").val(data["Class"]);
    $("#birthDate").val(data["Birth-Date"]);
    $("#address").val(data["Address"]);
    $("#enrollmentDate").val(data["Enrollment-Date"]);
}


function resetForm() {
    $("#rollNo").val("");
    $("#fullName").val("");
    $("#studentClass").val("");
    $("#birthDate").val("");
    $("#address").val("");
    $("#enrollmentDate").val("");

    $("#rollNo").prop("disabled", false);

    setStudentFieldsDisabled(true);

    $("#save").prop("disabled", true);
    $("#update").prop("disabled", true);
    $("#reset").prop("disabled", true);

    localStorage.removeItem("recno");

    $("#rollNo").focus();
}


function validateAndGetFormData() {
    var rollNo = $("#rollNo").val().trim();
    var fullName = $("#fullName").val().trim();
    var studentClass = $("#studentClass").val().trim();
    var birthDate = $("#birthDate").val().trim();
    var address = $("#address").val().trim();
    var enrollmentDate = $("#enrollmentDate").val().trim();

    if (rollNo === "") {
        alert("Roll No is required.");
        $("#rollNo").prop("disabled", false).focus();
        return "";
    }

    if (fullName === "") {
        alert("Full Name is required.");
        $("#fullName").focus();
        return "";
    }

    if (studentClass === "") {
        alert("Class is required.");
        $("#studentClass").focus();
        return "";
    }

    if (birthDate === "") {
        alert("Birth Date is required.");
        $("#birthDate").focus();
        return "";
    }

    if (address === "") {
        alert("Address is required.");
        $("#address").focus();
        return "";
    }

    if (enrollmentDate === "") {
        alert("Enrollment Date is required.");
        $("#enrollmentDate").focus();
        return "";
    }

    var jsonStrObj = {
        "Roll-No": rollNo,
        "Full-Name": fullName,
        "Class": studentClass,
        "Birth-Date": birthDate,
        "Address": address,
        "Enrollment-Date": enrollmentDate
    };

    return JSON.stringify(jsonStrObj);
}


function saveStudent() {
    var jsonStr = validateAndGetFormData();

    if (jsonStr === "") {
        return;
    }

    var putRequest = createPUTRequest(
        connToken,
        jsonStr,
        studentDBName,
        studentRelationName
    );

    jQuery.ajaxSetup({ async: false });

    var resultObj = executeCommandAtGivenBaseUrl(
        putRequest,
        jpdbBaseURL,
        jpdbIML
    );

    jQuery.ajaxSetup({ async: true });

    if (resultObj.status === 200) {
        alert("Student record saved successfully.");
        resetForm();
    } else {
        alert("Student record could not be saved.");
        console.log(resultObj);
    }
}


function updateStudent() {
    var jsonStr = validateAndGetFormData();

    if (jsonStr === "") {
        return;
    }

    var recNo = localStorage.getItem("recno");

    if (!recNo) {
        alert("Record number not found. Please reset the form and try again.");
        resetForm();
        return;
    }

    var updateRequest = createUPDATERecordRequest(
        connToken,
        jsonStr,
        studentDBName,
        studentRelationName,
        recNo
    );

    jQuery.ajaxSetup({ async: false });

    var resultObj = executeCommandAtGivenBaseUrl(
        updateRequest,
        jpdbBaseURL,
        jpdbIML
    );

    jQuery.ajaxSetup({ async: true });

    if (resultObj.status === 200) {
        alert("Student record updated successfully.");
        resetForm();
    } else {
        alert("Student record could not be updated.");
        console.log(resultObj);
    }
}
