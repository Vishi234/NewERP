function getMasterGridSettings() {
 var gridViewSettings = new Array();
 var labelArray = getLabel_Header();
 var AcademicDetails = [
{ headerName: labelArray['$ID$'], field: 'id', hide: true, headerTooltip: '', width: 115, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: false},
{ headerName: labelArray['$ACADEMIC_YEAR$'], field: 'acYear', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: false},
{ headerName: labelArray['$START_DATE$'], field: 'wfDate', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-left', cellStyle: '', suppressMenu: false, export: true},
{ headerName: labelArray['$END_DATE$'], field: 'wtDate', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-left', cellStyle: '', suppressMenu: false, export: true},
{ headerName: labelArray['$IS_ACTIVE$'], field: 'isActive', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-left', cellStyle: '', suppressMenu: false, export: true, cellRenderer: 'CreateActive'},
{ headerName: labelArray['$EDIT$'], field: 'Edit', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-left', cellStyle: '', suppressMenu: false, export: true, cellRenderer: 'CreateEdit'}
 ];
 var AcademicDetails_Export = ['wfDate','wtDate','isActive','Edit'];
var AcademicDetails_ExportCaption = ['START_DATE','END_DATE','IS_ACTIVE','EDIT'];

 gridViewSettings['$AcademicDetails$'] =AcademicDetails;
 gridViewSettings['$AcademicDetails_Export$'] =AcademicDetails_Export;
 gridViewSettings['$AcademicDetails_ExportCaption$'] =AcademicDetails_ExportCaption;

 var CourseDetails = [
{ headerName: labelArray['$COURSE_ID$'], field: 'id', hide: true, headerTooltip: '', width: 115, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: false},
{ headerName: labelArray['$COURSE_TYPE$'], field: 'cType', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-left', cellStyle: '', suppressMenu: false, export: true},
{ headerName: labelArray['$COURSE_NAME$'], field: 'cnm', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: false},
{ headerName: labelArray['$NO_OF_SEMESTER$'], field: 'nsem', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-left', cellStyle: '', suppressMenu: false, export: true},
{ headerName: labelArray['$IS_ACTIVE$'], field: 'isActive', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-left', cellStyle: '', suppressMenu: false, export: true, cellRenderer: 'CreateActive'},
{ headerName: labelArray['$EDIT$'], field: 'Edit', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-left', cellStyle: '', suppressMenu: false, export: true, cellRenderer: 'CreateEdit'}
 ];
 var CourseDetails_Export = ['cType','nsem','isActive','Edit'];
var CourseDetails_ExportCaption = ['COURSE_TYPE','NO_OF_SEMESTER','IS_ACTIVE','EDIT'];

 gridViewSettings['$CourseDetails$'] =CourseDetails;
 gridViewSettings['$CourseDetails_Export$'] =CourseDetails_Export;
 gridViewSettings['$CourseDetails_ExportCaption$'] =CourseDetails_ExportCaption;

 var DurationDetails = [
{ headerName: labelArray['$ID$'], field: 'id', hide: true, headerTooltip: '', width: 115, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: false},
{ headerName: labelArray['$YEAR_ID$'], field: 'acYear', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: false},
{ headerName: labelArray['$COURSE_ID$'], field: 'cnm', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: false},
{ headerName: labelArray['$NO_OF_SEMESTER$'], field: 'nsem', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-left', cellStyle: '', suppressMenu: false, export: true},
{ headerName: labelArray['$START_DATE$'], field: 'sDt', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-left', cellStyle: '', suppressMenu: false, export: true},
{ headerName: labelArray['$END_DATE$'], field: 'eDt', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-left', cellStyle: '', suppressMenu: false, export: true},
{ headerName: labelArray['$IS_ACTIVE$'], field: 'isActive', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-left', cellStyle: '', suppressMenu: false, export: true, cellRenderer: 'CreateActive'},
{ headerName: labelArray['$EDIT$'], field: 'Edit', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-left', cellStyle: '', suppressMenu: false, export: true, cellRenderer: 'CreateEdit'}
 ];
 var DurationDetails_Export = ['nsem','sDt','eDt','isActive','Edit'];
var DurationDetails_ExportCaption = ['NO_OF_SEMESTER','START_DATE','END_DATE','IS_ACTIVE','EDIT'];

 gridViewSettings['$DurationDetails$'] =DurationDetails;
 gridViewSettings['$DurationDetails_Export$'] =DurationDetails_Export;
 gridViewSettings['$DurationDetails_ExportCaption$'] =DurationDetails_ExportCaption;

 var SectionDetails = [
{ headerName: labelArray['$COURSE_ID$'], field: 'courseName', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: false},
{ headerName: labelArray['$COURSE_ID$'], field: 'courseId', hide: true, headerTooltip: '', width: 115, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: false},
{ headerName: labelArray['$SEMESTER_ID$'], field: 'semId', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: false},
{ headerName: labelArray['$SECTION_ID$'], field: 'secId', hide: true, headerTooltip: '', width: 115, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: false},
{ headerName: labelArray['$SECTION_NAME$'], field: 'secName', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-left', cellStyle: '', suppressMenu: false, export: true},
{ headerName: labelArray['$IS_ACTIVE$'], field: 'isActive', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-left', cellStyle: '', suppressMenu: false, export: true, cellRenderer: 'CreateActive'},
{ headerName: labelArray['$CREATED_BY$'], field: 'createdBy', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-left', cellStyle: '', suppressMenu: false, export: true},
{ headerName: labelArray['$EDIT$'], field: 'Edit', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-left', cellStyle: '', suppressMenu: false, export: true, cellRenderer: 'CreateEdit'}
 ];
 var SectionDetails_Export = ['secName','isActive','createdBy','Edit'];
var SectionDetails_ExportCaption = ['SECTION_NAME','IS_ACTIVE','CREATED_BY','EDIT'];

 gridViewSettings['$SectionDetails$'] =SectionDetails;
 gridViewSettings['$SectionDetails_Export$'] =SectionDetails_Export;
 gridViewSettings['$SectionDetails_ExportCaption$'] =SectionDetails_ExportCaption;

 var SubjectDetails = [
{ headerName: labelArray['$SUBJECT_ID$'], field: 'id', hide: true, headerTooltip: '', width: 115, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: false},
{ headerName: labelArray['$SUBJECT_CODE$'], field: 'scde', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: false},
{ headerName: labelArray['$SUBJECT_NAME$'], field: 'snm', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: false},
{ headerName: labelArray['$SUBJECT_SHORT_NAME$'], field: 'ssnm', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-left', cellStyle: '', suppressMenu: false, export: true},
{ headerName: labelArray['$SUBJECT_MEDIUM$'], field: 'smed', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-left', cellStyle: '', suppressMenu: false, export: true},
{ headerName: labelArray['$SUBJECT_TYPE$'], field: 'styp', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-left', cellStyle: '', suppressMenu: false, export: true},
{ headerName: labelArray['$IS_ACTIVE$'], field: 'isActive', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-left', cellStyle: '', suppressMenu: false, export: true, cellRenderer: 'CreateActive'},
{ headerName: labelArray['$EDIT$'], field: 'Edit', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-left', cellStyle: '', suppressMenu: false, export: true, cellRenderer: 'CreateEdit'}
 ];
 var SubjectDetails_Export = ['ssnm','smed','styp','isActive','Edit'];
var SubjectDetails_ExportCaption = ['SUBJECT_SHORT_NAME','SUBJECT_MEDIUM','SUBJECT_TYPE','IS_ACTIVE','EDIT'];

 gridViewSettings['$SubjectDetails$'] =SubjectDetails;
 gridViewSettings['$SubjectDetails_Export$'] =SubjectDetails_Export;
 gridViewSettings['$SubjectDetails_ExportCaption$'] =SubjectDetails_ExportCaption;

 var ActivityDetails = [
{ headerName: labelArray['$ACTIVITY_ID$'], field: 'id', hide: true, headerTooltip: '', width: 115, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: false},
{ headerName: labelArray['$ACTIVITY_NAME$'], field: 'anm', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: false},
{ headerName: labelArray['$ACTIVITY_TYPE$'], field: 'atyp', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-left', cellStyle: '', suppressMenu: false, export: true},
{ headerName: labelArray['$START_DATE$'], field: 'sDt', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-left', cellStyle: '', suppressMenu: false, export: true},
{ headerName: labelArray['$END_DATE$'], field: 'eDt', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-left', cellStyle: '', suppressMenu: false, export: true},
{ headerName: labelArray['$IS_ACTIVE$'], field: 'isActive', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-left', cellStyle: '', suppressMenu: false, export: true, cellRenderer: 'CreateActive'},
{ headerName: labelArray['$EDIT$'], field: 'Edit', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-left', cellStyle: '', suppressMenu: false, export: true, cellRenderer: 'CreateEdit'}
 ];
 var ActivityDetails_Export = ['atyp','sDt','eDt','isActive','Edit'];
var ActivityDetails_ExportCaption = ['ACTIVITY_TYPE','START_DATE','END_DATE','IS_ACTIVE','EDIT'];

 gridViewSettings['$ActivityDetails$'] =ActivityDetails;
 gridViewSettings['$ActivityDetails_Export$'] =ActivityDetails_Export;
 gridViewSettings['$ActivityDetails_ExportCaption$'] =ActivityDetails_ExportCaption;

 var MappingDetails = [
{ headerName: labelArray['$ID$'], field: 'id', hide: true, headerTooltip: '', width: 115, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: false},
{ headerName: labelArray['$COURSE_ID$'], field: 'cId', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: false},
{ headerName: labelArray['$SEMESTER$'], field: 'sem', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-center', cellStyle: '', suppressMenu: false, export: false},
{ headerName: labelArray['$SUBJECT_ID$'], field: 'subId', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-left', cellStyle: '', suppressMenu: false, export: true},
{ headerName: labelArray['$IS_ACTIVE$'], field: 'isActive', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-left', cellStyle: '', suppressMenu: false, export: true, cellRenderer: 'CreateActive'},
{ headerName: labelArray['$EDIT$'], field: 'Edit', hide: false, headerTooltip: '', width: 115, cellClass: 'grid-left', cellStyle: '', suppressMenu: false, export: true, cellRenderer: 'CreateEdit'}
 ];
 var MappingDetails_Export = ['subId','isActive','Edit'];
var MappingDetails_ExportCaption = ['SUBJECT_ID','IS_ACTIVE','EDIT'];

 gridViewSettings['$MappingDetails$'] =MappingDetails;
 gridViewSettings['$MappingDetails_Export$'] =MappingDetails_Export;
 gridViewSettings['$MappingDetails_ExportCaption$'] =MappingDetails_ExportCaption;
  return gridViewSettings;
}