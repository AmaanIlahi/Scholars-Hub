from django.shortcuts import render

from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import employees
from .serializers import employeeSerializer
import  csv
import os

# Create your views here.

class employeeList(APIView):

    def get(self,request):
        employees1 = employees.objects.all()
        serializer = employeeSerializer(employees1, many=True)
        return Response(serializer.data)

    def post(self):
        pass

class letsInternData(APIView):

    def listSkills(self,x):
        y = x.split('  ')

        z = []
        for el in y:
            if (el != ''):
                z.append(el.strip())
        return z

    def get(self,request):
        # print('----------------',os.getcwd(),'-----------------')
        listToSend = []
        with open('./trialAPI/CLEAN_information_from_links.csv',encoding="utf-8") as csvFile:
            csvReader = csv.DictReader(csvFile)
            i = 0
            for rows in csvReader:
                if(i==100):
                    break
                data = {}
                data['url_path'] = rows['href']
                data['title'] = rows['job_title']
                data['company_name'] = rows['company_name']
                data['location'] = self.listSkills(rows['job_loc'])
                data['category'] = rows['category']
                data['intern_type'] = rows['compensation']
                data['applyBy'] = rows['applyBy'][9:]
                data['start'] = rows['start']
                data['end'] = rows['end']
                skillsArray = rows['skills']
                # j=1
                # skillsFinal=[]
                # l = len(skillsArray)-1
                # while j< l:
                #     skillsFinal.append(skillsArray[j])
                #     j = j+1
                
                data['skills'] = self.listSkills(skillsArray)

                listToSend.append(data)
                i = i+1

        return Response(listToSend)

