using System.ComponentModel.DataAnnotations;

namespace SchoolManagementSystem.school
{
    public class Student
    {
       
        public int StudentID { get; set; }
        public string Student_Fname { get; set; }
        public string Student_Lname { get; set; }
        public string maj_code { get; set; }
        public DateTime? std_Dob { get; set; }

       public ICollection<Grade> Grades { get; set; }
    }
}
