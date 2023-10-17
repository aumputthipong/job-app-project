class Job {
  constructor(
    id,
    category,
    JobTitle,
    Position,
    imageUrl,
    Workperiod,
    Agency,
    Wages,
    WelfareBenefit,
    Email,
    Phone,
    EmploymentType,
    Attribute,
  ) {
    this.id = id;
    this.JobTitle = JobTitle;
    this.category = category;
    this.Position = Position;
    this.imageUrl = imageUrl;
    this.Workperiod = Workperiod;
    this.Agency = Agency;
    this.Wages = Wages;
    this.WelfareBenefit = WelfareBenefit;
    this.Email = Email;
    this.Phone = Phone;
    this.EmploymentType = EmploymentType;
    this.Attribute =Attribute
  }
}

export default Job;
