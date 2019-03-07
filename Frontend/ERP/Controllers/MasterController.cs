using ERP.Models.Bal.Common;
using ERP.Models.Bal.Master;
using ERP.Models.Entity;
using ERP.Models.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ERP.Controllers
{

    [SessionCheck]
    public class MasterController : Controller
    {
        // GET: Master

        public ActionResult Academic()
        {
            AcademicEntity academicEntity = new AcademicEntity();
            academicEntity.flag = 'G';
            academicEntity.reportId = "1";
            TempData["AcademicData"] = new Master().AddAcademicYear(academicEntity);
            return View();
        }
        [HttpPost]
        public JsonResult Academic(AcademicEntity academicEntity)
        {
            UserEntity objUserEntity = UserEntity.GetInstance();
            return Json(new Master().AddAcademicYear(academicEntity));
        }
        public ActionResult Course()
        {
            CourseEntity courseEntity = new CourseEntity();
            courseEntity.flag = 'G';
            courseEntity.reportId = "2";
            TempData["CourseData"] = new Master().AddCourse(courseEntity);
            return View();
        }
        [HttpPost]
        public ActionResult Course(CourseEntity courseEntity)
        {
            return Json(new Master().AddCourse(courseEntity));
        }
        public ActionResult Duration()
        {
            DurationEntity durationEntity = new DurationEntity();
            durationEntity.flag = 'G';
            durationEntity.reportId = "3";
            TempData["DurationData"] = new Master().AddDuration(durationEntity);
            return View();
        }
        public string Durationddl()
        {
            Master objMaster = new Master();
            return (objMaster.CourseDuration());
            //return objMaster.CourseDuration();

        }
        [HttpPost]
        public ActionResult Duration(DurationEntity durationEntity)
        {
            UserEntity objUserEntity = UserEntity.GetInstance();
            return Json(new Master().AddDuration(durationEntity));
        }

        public ActionResult Activity()
        {
            UserEntity objUserEntity = UserEntity.GetInstance();
            ActivityEntity activityEntity = new ActivityEntity();
            activityEntity.flag = 'G';
            activityEntity.reportId = "6";
            TempData["ActivityData"] = new Master().AddActivity(activityEntity, objUserEntity.customerId, objUserEntity.userId);
            return View();
        }
        [HttpPost]
        public JsonResult Activity(ActivityEntity activityEntity)
        {
            UserEntity objUserEntity = UserEntity.GetInstance();
            return Json(new Master().AddActivity(activityEntity, objUserEntity.customerId, objUserEntity.userId));
        }
        public ActionResult Subject()
        {
            UserEntity objUserEntity = UserEntity.GetInstance();
            SubjectEntity subjectEntity = new SubjectEntity();
            subjectEntity.flag = 'G';
            subjectEntity.reportId = "5";
            TempData["SubjectData"] = new Master().AddSubject(subjectEntity);
            return View();
        }
        [HttpPost]
        public ActionResult Subject(SubjectEntity subjectEntity)
        {
            UserEntity objUserEntity = UserEntity.GetInstance();
            return Json(new Master().AddSubject(subjectEntity));
        }

        public ActionResult Mapping()
        {
            MappingEntity mapping = new MappingEntity();
            mapping.flag = 'G';
            mapping.reportId = "7";
            TempData["MappingData"] = new Master().AddMappingDetails(mapping);
            return View();
        }
        [HttpPost]
        public JsonResult Mapping(MappingEntity mapping)
        {
            UserEntity objUserEntity = UserEntity.GetInstance();
            return Json(new Master().AddMappingDetails(mapping));
        }
        public string GetCourseDDL(String ddlType)
        {
            Master objMaster = new Master();
            return (objMaster.GetCourseDDL(ddlType));
        }
        public string GetParamList(string flag, string ddlType)
        {
            return CommonFunc.GetParamList(flag, ddlType);
        }

        [HttpPost]
        public JsonResult SaveSectionDetails(SectionEntity sectionEntity)
        {
            Master objMaster = new Master();

            return Json(objMaster.SectionDetails(sectionEntity));
        }
        public ActionResult Section()
        {
            SectionEntity sectionEntity = new SectionEntity();
            sectionEntity.operType = 'G';
            sectionEntity.reportId = "4";
            TempData["SectionData"] = new Master().SectionDetails(sectionEntity);
            return View();
        }

    }
}