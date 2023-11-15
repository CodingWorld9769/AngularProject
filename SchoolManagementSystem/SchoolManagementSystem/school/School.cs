namespace SchoolManagementSystem.school
{
    public class School
    {
        //school (sch_code, sch_name, sch_phone, sch_dean_name)
        [key]
        public string sch_code { get; set; }
        public string sch_name { get; set;}

        public string sch_type { get; set;}

        public string sch_phone { get; set; }

        public string sch_dean_name { get; set; }
    }
}
