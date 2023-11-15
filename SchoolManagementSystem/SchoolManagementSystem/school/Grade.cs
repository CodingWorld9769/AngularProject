namespace SchoolManagementSystem.school
{
    public class Grade
    {
        public int student_id { get; set; } 
        public int gr_t1 { get; set; }
        public int gr_t2 { get; set; }
        public int gr_pr { get; set; }
        public int gr_hw { get; set; }


        public Student student { get; set; }

    }
}
