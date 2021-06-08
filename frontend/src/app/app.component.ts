import { HttpClient } from '@angular/common/http';
import { Component, OnInit, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {NgSelectModule, NgOption} from '@ng-select/ng-select';
//import 'rxjs/add/operator/catch';
//import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  selectedCity:any;
  selectedSkills: any;
  skills = [
    'Algorithms',    'Analytical Skills',    'Big Data',    'Calculating',    'Compiling Statistics',    'Data Analytics',    'Data Mining',
    'Database Design',    'Database Management',    'Documentation',    'Modeling',    'Modification',    'Needs Analysis',    'Quantitative Research',    'Quantitative Reports',
    'Statistical Analysis',    'Applications',    'Certifications',    'Coding',    'Computing',    'Configuration',    'Customer Support',    'Debugging',
    'Design',    'Development',    'Hardware',    'Implementation',    'Information Technology', 'Python', 
    'Infrastructure',    'Languages',    'Maintenance', 'Web Development',    'Network Architecture',    'Network Security',    'Networking',    'New Technologies',    'Operating Systems',
    'Programming',    'Restoration',    'Security',    'Servers',    'Software',    'Solution Delivery',    'Storage',    'Structures',
    'Systems Analysis',    'Technical Support',    'Technology',    'Testing',    'Tools',    'Training',    'Troubleshooting',    'Usability',
    'Benchmarking',    'Budget Planning',    'Engineering',    'Fabrication',    'Following Specifications',    'Operations',    'Performance Review',    'Project Planning',
    'Quality Assurance',    'Quality Control',    'Scheduling',    'Task Delegation',    'Task Management',    'Blogging',    'Digital Photography',    'Digital Media',
    'Facebook',    'Instagram',    'Networking',    'Pinterest',    'SEO',    'Social Media Platforms',    'Twitter',    'Web Analytics',
    'Client Relations',    'Email',    'Requirements Gathering',    'Research',    'Subject Matter Experts (SMEs)',    'Technical Documentation'
  ];
  programs = [
    'B.Tech', 'M.Tech', 'BCA', 'MCA',
  ];
  locationsNG:any;
  skillsNG:any;

  internships=[
    {
      companyName: 'Company A',
      roleName : 'Web Development',
      startDate: 'Immediately',
      duration: '2 Weeks',
      stipend: 'Unpaid',
      applyBy: "26 May'21",
      applyURL: ""
    },
    {
      companyName: 'Company B',
      roleName : 'Python Development',
      startDate: '30th July 2021',
      duration: '4 Weeks',
      stipend: 'INR 20,000',
      applyBy: "26 May'21",
      applyURL: ""
    },
    {
      companyName: 'Company C',
      roleName : 'Data Science',
      startDate: 'Immediately',
      duration: '6 Weeks',
      stipend: 'INR 30,000',
      applyBy: "26 May'21",
      applyURL: ""
    }
  ];
  url = 'http://127.0.0.1:8000/letsInternList/';
  //url = 'http://127.0.0.1:3000/jobs';
  backendData: any;
  dataToPresent: any;

  constructor(private router: Router, private http:HttpClient) {

  }
  title = 'Scholars Hub';  

  ngOnInit(){
    //console.log(this.internships);
    this.fetchData();
    //this.dataToPresent = this.backendData;
    
    console.log("locs -- ", this.locationsNG);
    console.log("data to present", this.dataToPresent);
  }

  async locationsListCreate(){
    let mySet = new Set();
    //console.log("func locLsir", this.backendData);
    for (let item  of this.backendData ){
      //console.log("item val", item);
      for(let loc of item.location){
        // if(loc.substring(loc.length -1) == ',')
        //   loc = loc.substring(0,loc.length-1)
        mySet.add(loc);
      }
    }
    var tempArray = []
    for(let loc of mySet){
      tempArray.push(loc)
    }
    tempArray.sort();
    console.log(tempArray);
    this.locationsNG = tempArray;

  }

  fetchData(){
    const promise = this.http.get(this.url).toPromise();
    console.log(promise);  
    promise.then((data)=>{
      //this.dataToPresent = JSON.parse(data)
      this.backendData = data
      
      //edit the locations and skills
      for (var i=0; i<this.backendData.length; i++){
        var sz = this.backendData[i].skills.length
        var sz2 = this.backendData[i].location.length
        this.backendData[i].skills = this.backendData[i].skills.splice(1,sz)
        for(var j=0; j<sz2; j++){
          var loc = this.backendData[i].location[j]
          if(loc.substring(loc.length -1) == ','){
            loc = loc.substring(0,loc.length-1)
            this.backendData[i].location[j] = loc
          }

        }
      }
      this.dataToPresent = this.backendData

      this.locationsListCreate();
      //console.log(this.dataToPresent)
    }).catch((error)=>{
      console.log("Promise rejected with " + JSON.stringify(error));
    });
  }

  btnClick() {
    this.router.navigateByUrl('/indeed');
  }
  openDetailsPage(x:any){
    console.log(x);
    this.router.navigateByUrl(x);
  }

  locationPresentable(arr:any){
    var str = ""
    for(var i=0; i<arr.length -1; i++){
      str = str+arr[i]+", "
    }
    str =str+arr[arr.length-1]
    return str
  }

  skillsSliced(x:any){
    var y = x.splice(1,x.length)
    return y;
  }

  selectedLocation(){
    console.log(this.selectedCity);

    var newData = [];
    for (let item  of this.dataToPresent ){
        if(item.location.includes(this.selectedCity))
          newData.push(item)
    }
    this.dataToPresent = newData;
  }

  searchSkillsFunc()
  {
    var newData = [];
    for (let item  of this.dataToPresent ){
        if(item.skills.includes(this.selectedSkills))
          newData.push(item)
    }
    this.dataToPresent = newData;
  }



  }




  








  // async funcTemp(){
  //   return await this.http.get(this.url);
  // }
  // tempFunc2() {
  //   let promise = new Promise<void>((resolve, reject) => {
  //     let apiURL = this.url;
  //     this.http.get(apiURL)
  //       .toPromise()
  //       .then(
  //         res => { // Success
  //           console.log("response  ",res);
  //           resolve();
  //         },
  //         msg => { // Error
  //           reject(msg);
  //         }
  //       );
  //   });
  //   return promise;
  // }
//}
