import { Project, PointTypeEnum } from "../app/shared/projects-dashboard/project.model";

export const staticProjects: Project[] = [
  {
    id: 1,
    name: 'مشروع درب الحرمين',
    autoScroll: { x: 15, y: 18},
    mapImage: 'https://res.cloudinary.com/dmyhr9fcz/image/upload/v1733557106/inv4kki12ltoa7fqoupo.webp',
    points: [
      {
        id: 1,
        type: PointTypeEnum.PROJECT, 
        position: { x: 39, y: 48 },
        name: '',
        logo: "https://res.cloudinary.com/dmyhr9fcz/image/upload/v1733559930/ogx0jgirrgqrjq70gjed.ico",
        isProject: true,
        paths: [
          {
            point: {
              id: 2, type: PointTypeEnum.HOSPITAL, position: { x: 60, y: 32 }, name: "",
              isProject: false
            },
            path: [
              { id: 1, x: 39, y: 48 },
              { id: 2, x: 45, y: 42 },
              { id: 3, x: 50, y: 37 },
              { id: 4, x: 55, y: 35 },
              { id: 5, x: 60, y: 32 }
            ]
          },
          {
            point: {
              id: 3, type: PointTypeEnum.HOSPITAL, position: { x: 69, y: 61 }, name: "",
              isProject: false
            },
            path: [
              { id: 1, x: 39, y: 48 },
              { id: 2, x: 45, y: 55 },
              { id: 3, x: 55, y: 58 },
              { id: 4, x: 64, y: 60 },
              { id: 5, x: 69, y: 61 }
            ]
          },
          {
            point: {
              id: 4, type: PointTypeEnum.HOSPITAL, position: { x: 28, y: 40 }, name: "",
              isProject: false
            },
            path: [
              { id: 1, x: 39, y: 48 },
              { id: 2, x: 35, y: 45 },
              { id: 3, x: 30, y: 42 },
              { id: 4, x: 28, y: 40 }
            ]
          },
          {
            point: {
              id: 5, type: PointTypeEnum.MALL, position: { x: 54.3, y: 30 }, name: "",
              isProject: false
            },
            path: [
              { id: 1, x: 39, y: 48 },
              { id: 2, x: 45, y: 40 },
              { id: 3, x: 50, y: 35 },
              { id: 4, x: 54.3, y: 30 }
            ]
          },
          {
            point: {
              id: 6, type: PointTypeEnum.MALL, position: { x: 63, y: 29 }, name: "",
              isProject: false
            },
            path: [
              { id: 1, x: 39, y: 48 },
              { id: 2, x: 50, y: 38 },
              { id: 3, x: 58, y: 32 },
              { id: 4, x: 63, y: 29 }
            ]
          },
          {
            point: {
              id: 7, type: PointTypeEnum.MALL, position: { x: 29, y: 52 }, name: "",
              isProject: false
            },
            path: [
              { id: 1, x: 39, y: 48 },
              { id: 2, x: 34, y: 50 },
              { id: 3, x: 30, y: 51 },
              { id: 4, x: 29, y: 52 }
            ]
          },
          {
            point: {
              id: 8, type: PointTypeEnum.RESTAURANT, position: { x: 42, y: 37 }, name: "",
              isProject: false
            },
            path: [
              { id: 1, x: 39, y: 48 },
              { id: 2, x: 40, y: 42 },
              { id: 3, x: 41, y: 38 },
              { id: 4, x: 42, y: 37 }
            ]
          },
          {
            point: {
              id: 9, type: PointTypeEnum.SCHOOL, position: { x: 75, y: 51 }, name: "",
              isProject: false
            },
            path: [
              { id: 1, x: 39, y: 48 },
              { id: 2, x: 50, y: 50 },
              { id: 3, x: 60, y: 55 },
              { id: 4, x: 70, y: 50 },
              { id: 5, x: 75, y: 51 }
            ]
          }
        ]
      },
      {
        id: 2,
        type: PointTypeEnum.HOSPITAL,
        position: { x: 60, y: 32 },
        name: '',
        isProject: false
      },
      {
        id: 3,
        type: PointTypeEnum.HOSPITAL,
        position: { x: 69, y: 61 },
        name: '',
        isProject: false
      },
      {
        id: 4,
        type: PointTypeEnum.HOSPITAL,
        position: { x: 28, y: 40 },
        name: '',
        isProject: false
      },
      {
        id: 5,
        type: PointTypeEnum.MALL,
        position: { x: 54.3, y: 30 },
        name: '',
        isProject: false
      },
      {
        id: 6,
        type: PointTypeEnum.MALL,
        position: { x: 63, y: 29 },
        name: '',
        isProject: false
      },
      {
        id: 7,
        type: PointTypeEnum.MALL,
        position: { x: 29, y: 52 },
        name: '',
        isProject: false
      },
      {
        id: 8,
        type: PointTypeEnum.RESTAURANT,
        position: { x: 42, y: 37 },
        name: '',
        isProject: false
      },
      {
        id: 9,
        type: PointTypeEnum.SCHOOL,
        position: { x: 75, y: 51 },
        name: '',
        isProject: false
      },
    ],
  },
];
