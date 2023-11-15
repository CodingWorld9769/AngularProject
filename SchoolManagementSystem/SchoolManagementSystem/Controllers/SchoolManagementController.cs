using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SchoolManagementSystem.school;

namespace SchoolManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SchoolManagementController : ControllerBase
    {

        private readonly SchoolContext schoolContext;

        public SchoolManagementController(SchoolContext schoolContext)
        {
            this.schoolContext = schoolContext;
            
        }
        //Api for getting student from database
        [HttpGet]
        [Route("GetStudent")]
        public List<Student> Get()
        {
            return schoolContext.Students.ToList();

        }

        //Api for getting Single record
        [HttpGet]
        [Route("GetStudent/{id}")]
        public Student GetStudent(int id)
        {
            return schoolContext.Students.FirstOrDefault(x => x.StudentID == id);
        }


        //Api for adding student
        [HttpPost]
        [Route("AddStudent")]
        public string AddStudent(Student student)
        {

            string response = string.Empty;
            schoolContext.Students.Add(student);
            schoolContext.SaveChanges();
            return "Student Add";

        }

        
        [HttpDelete]
        [Route("DeleteStudent")]
        public string Delete(int id)
        {
            Student student = schoolContext.Students.Where(x => x.StudentID == id).FirstOrDefault();
            schoolContext.Students.Remove(student);
            schoolContext.SaveChanges();
            return "Student delete successfull";

        }
    }
}
