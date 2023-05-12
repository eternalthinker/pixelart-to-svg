(()=>{"use strict";function e(e){return e.toString(16).padStart(2,"0")}function t(t,s,a){return"#"+e(t)+e(s)+e(a)}onmessage=async e=>{try{await async function(e){const{canvas:s,pixelImg:a,spriteConfig:i}=e,{width:n,height:o,nRows:l,nCols:g,padding:r,outputPixelSize:p,spriteNames:c}=i,d=s.getContext("2d",{willReadFrequently:!0,antialias:!1});d.drawImage(a,0,0);const h=s.width,f=s.height,u=h/g,y=f/l,m=u/(n+2*r),w=l*g;postMessage({type:"info",message:`We have ${w} images in ${l} rows and ${g} columns, ${m} ppu`}),postMessage({type:"info",message:`sheetw: ${h}, sheeth: ${f}`});let x=1;for(let e=0;e<l;++e)for(let s=0;s<g;++s){let a=`image${x}`;c.length>x-1&&(a=c[x-1]);const i={filename:a,padding:r*p,w:n*p,h:o*p,pixels:[]};let l;if(r>0){l=d.getImageData(u*s,y*e,1,1).data;const a=t(l[0],l[1],l[2]);i.background={fill:a,x:0,y:0,w:(n+2*r)*p,h:(o+2*r)*p},i.guide={mask:[{x:(r-1)*p,y:(r-1)*p,w:(n+2)*p,h:(o+2)*p,fill:"#3F3F3F"},{x:r*p,y:r*p,w:n*p,h:n*p,fill:"#000000"}],masked:{x:(r-1)*p,y:(r-1)*p,w:(n+2)*p,h:(o+2)*p,fill:"#000000"}}}for(let a=0;a<o;++a)for(let o=0;o<n;++o){const n=u*s+(o+r)*m,g=y*e+(a+r)*m,c=d.getImageData(n,g,1,1).data,h=c[3]/255;if(M=l,null!=($=c)&&null!=M&&$[0]===M[0]&&$[1]===M[1]&&$[2]===M[2]||0===h)continue;const f=t(c[0],c[1],c[2]);i.pixels.push({fill:f,opacity:h,x:o*p,y:a*p,w:p,h:p})}postMessage({type:"progress",details:`${x}/${w}`,svgData:i}),x+=1}var $,M}(e.data),postMessage({type:"end"})}catch(e){postMessage({type:"error",error:e})}}})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFRbkMsRUFBSXdCLGFBQWFTLEVBQUlDLEVBQUksRUFBRyxHQUFHN0MsS0FDdkMrQyxFQUFlRCxFQUFNLEdBQUssSUFDaEMsR0E2QmFFLEVBN0JRZCxFQThCbkIsT0FET2UsRUE3QktILElBOEJFLE1BQU5FLEdBR1hDLEVBQUcsS0FBT0QsRUFBRyxJQUFNQyxFQUFHLEtBQU9ELEVBQUcsSUFBTUMsRUFBRyxLQUFPRCxFQUFHLElBakNBLElBQWpCRCxFQUcvQixTQUVGLE1BQU1HLEVBQWF6RCxFQUFTcUQsRUFBTSxHQUFJQSxFQUFNLEdBQUlBLEVBQU0sSUFDdERoQixFQUFRRyxPQUFPa0IsS0FBSyxDQUNsQmIsS0FBTVksRUFDTkUsUUFBU0wsRUFDVFIsRUFBR0EsRUFBSTlCLEVBQ1ArQixFQUFHQSxFQUFJL0IsRUFDUHNCLEVBQUd0QixFQUNIdUIsRUFBR3ZCLEdBRVAsQ0FHRmEsWUFBWSxDQUNWQyxLQUFNLFdBQ044QixRQUFTLEdBQUc1QixLQUFZSixJQUN4QlMsWUFHRkwsR0FBWSxDQUNkLENBS0osSUFBbUJ3QixFQUFJRCxDQUh2QixDQTFJVU0sQ0FBaUJ2RCxFQUFFQyxNQUV6QnNCLFlBQVksQ0FDVkMsS0FBTSxPQUVWLENBQUUsTUFBT2dDLEdBQ1BqQyxZQUFZLENBQ1ZDLEtBQU0sUUFDTmlDLE1BQU9ELEdBRVgsRSIsInNvdXJjZXMiOlsid2VicGFjazovL3BpeGVsYXJ0LXRvLXN2Zy8uL3NyYy91dGlscy5qcyIsIndlYnBhY2s6Ly9waXhlbGFydC10by1zdmcvLi9zcmMvY29udmVydF93b3JrZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGxvYWRJbWFnZShpbWdQYXRoKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgY29uc3QgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICBpbWFnZS5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXNvbHZlKGltYWdlKTtcbiAgICB9O1xuICAgIGltYWdlLm9uZXJyb3IgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZWplY3QobmV3IEVycm9yKGBJbWFnZSBjYW5ub3QgYmUgbG9hZGVkYCkpO1xuICAgIH07XG4gICAgaW1hZ2Uuc3JjID0gaW1nUGF0aDtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGNvbXBvbmVudFRvSGV4KGMpIHtcbiAgdmFyIGhleCA9IGMudG9TdHJpbmcoMTYpO1xuICByZXR1cm4gaGV4LnBhZFN0YXJ0KDIsIFwiMFwiKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJnYlRvSGV4KHIsIGcsIGIpIHtcbiAgcmV0dXJuIFwiI1wiICsgY29tcG9uZW50VG9IZXgocikgKyBjb21wb25lbnRUb0hleChnKSArIGNvbXBvbmVudFRvSGV4KGIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbG9jYWxTdG9yYWdlTnVtYmVyKGtleSwgdmFsdWUpIHtcbiAgdHJ5IHtcbiAgICBpZiAodmFsdWUgPT0gbnVsbCkge1xuICAgICAgY29uc3Qgc3RvcmVkVmFsdWUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkpO1xuICAgICAgaWYgKHN0b3JlZFZhbHVlICE9IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIE51bWJlcihzdG9yZWRWYWx1ZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGtleSwgdmFsdWUpO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgY29uc29sZS5sb2coZXJyKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgcmdiVG9IZXggfSBmcm9tIFwiLi91dGlsc1wiO1xuXG5vbm1lc3NhZ2UgPSBhc3luYyAoZSkgPT4ge1xuICB0cnkge1xuICAgIGF3YWl0IGNvbnZlcnRUb1N2Z0RhdGEoZS5kYXRhKTtcblxuICAgIHBvc3RNZXNzYWdlKHtcbiAgICAgIHR5cGU6IFwiZW5kXCIsXG4gICAgfSk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHBvc3RNZXNzYWdlKHtcbiAgICAgIHR5cGU6IFwiZXJyb3JcIixcbiAgICAgIGVycm9yOiBlcnIsXG4gICAgfSk7XG4gIH1cbn07XG5cbmFzeW5jIGZ1bmN0aW9uIGNvbnZlcnRUb1N2Z0RhdGEoZGF0YSkge1xuICBjb25zdCB7IGNhbnZhcywgcGl4ZWxJbWcsIHNwcml0ZUNvbmZpZyB9ID0gZGF0YTtcbiAgY29uc3QgeyB3aWR0aCwgaGVpZ2h0LCBuUm93cywgbkNvbHMsIHBhZGRpbmcsIG91dHB1dFBpeGVsU2l6ZSwgc3ByaXRlTmFtZXMgfSA9XG4gICAgc3ByaXRlQ29uZmlnO1xuXG4gIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIiwge1xuICAgIHdpbGxSZWFkRnJlcXVlbnRseTogdHJ1ZSxcbiAgICBhbnRpYWxpYXM6IGZhbHNlLFxuICB9KTtcbiAgY3R4LmRyYXdJbWFnZShwaXhlbEltZywgMCwgMCk7XG5cbiAgY29uc3Qgc3ByaXRlU2hlZXRXaWR0aCA9IGNhbnZhcy53aWR0aDtcbiAgY29uc3Qgc3ByaXRlU2hlZXRIZWlnaHQgPSBjYW52YXMuaGVpZ2h0O1xuICBjb25zdCBzcHJpdGVXaWR0aCA9IHNwcml0ZVNoZWV0V2lkdGggLyBuQ29scztcbiAgY29uc3Qgc3ByaXRlSGVpZ2h0ID0gc3ByaXRlU2hlZXRIZWlnaHQgLyBuUm93cztcbiAgY29uc3QgcGl4ZWxzUGVyVW5pdCA9IHNwcml0ZVdpZHRoIC8gKHdpZHRoICsgMiAqIHBhZGRpbmcpO1xuICBjb25zdCBudW1TcHJpdGVzID0gblJvd3MgKiBuQ29scztcbiAgcG9zdE1lc3NhZ2Uoe1xuICAgIHR5cGU6IFwiaW5mb1wiLFxuICAgIG1lc3NhZ2U6IGBXZSBoYXZlICR7bnVtU3ByaXRlc30gaW1hZ2VzIGluICR7blJvd3N9IHJvd3MgYW5kICR7bkNvbHN9IGNvbHVtbnMsICR7cGl4ZWxzUGVyVW5pdH0gcHB1YCxcbiAgfSk7XG4gIHBvc3RNZXNzYWdlKHtcbiAgICB0eXBlOiBcImluZm9cIixcbiAgICBtZXNzYWdlOiBgc2hlZXR3OiAke3Nwcml0ZVNoZWV0V2lkdGh9LCBzaGVldGg6ICR7c3ByaXRlU2hlZXRIZWlnaHR9YCxcbiAgfSk7XG5cbiAgbGV0IHN2Z0NvdW50ID0gMTtcbiAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgblJvd3M7ICsrcm93KSB7XG4gICAgZm9yIChsZXQgY29sID0gMDsgY29sIDwgbkNvbHM7ICsrY29sKSB7XG4gICAgICBsZXQgZmlsZW5hbWUgPSBgaW1hZ2Uke3N2Z0NvdW50fWA7XG4gICAgICBpZiAoc3ByaXRlTmFtZXMubGVuZ3RoID4gc3ZnQ291bnQgLSAxKSB7XG4gICAgICAgIGZpbGVuYW1lID0gc3ByaXRlTmFtZXNbc3ZnQ291bnQgLSAxXTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHN2Z0RhdGEgPSB7XG4gICAgICAgIGZpbGVuYW1lLFxuICAgICAgICBwYWRkaW5nOiBwYWRkaW5nICogb3V0cHV0UGl4ZWxTaXplLFxuICAgICAgICB3OiB3aWR0aCAqIG91dHB1dFBpeGVsU2l6ZSxcbiAgICAgICAgaDogaGVpZ2h0ICogb3V0cHV0UGl4ZWxTaXplLFxuICAgICAgICBwaXhlbHM6IFtdLFxuICAgICAgfTtcbiAgICAgIGxldCBiZ1BpeGVsO1xuXG4gICAgICBpZiAocGFkZGluZyA+IDApIHtcbiAgICAgICAgYmdQaXhlbCA9IGN0eC5nZXRJbWFnZURhdGEoXG4gICAgICAgICAgc3ByaXRlV2lkdGggKiBjb2wsXG4gICAgICAgICAgc3ByaXRlSGVpZ2h0ICogcm93LFxuICAgICAgICAgIDEsXG4gICAgICAgICAgMVxuICAgICAgICApLmRhdGE7XG4gICAgICAgIGNvbnN0IGJnQ29sb3IgPSByZ2JUb0hleChiZ1BpeGVsWzBdLCBiZ1BpeGVsWzFdLCBiZ1BpeGVsWzJdKTtcbiAgICAgICAgc3ZnRGF0YS5iYWNrZ3JvdW5kID0ge1xuICAgICAgICAgIGZpbGw6IGJnQ29sb3IsXG4gICAgICAgICAgeDogMCxcbiAgICAgICAgICB5OiAwLFxuICAgICAgICAgIHc6ICh3aWR0aCArIHBhZGRpbmcgKiAyKSAqIG91dHB1dFBpeGVsU2l6ZSxcbiAgICAgICAgICBoOiAoaGVpZ2h0ICsgcGFkZGluZyAqIDIpICogb3V0cHV0UGl4ZWxTaXplLFxuICAgICAgICB9O1xuXG4gICAgICAgIHN2Z0RhdGEuZ3VpZGUgPSB7XG4gICAgICAgICAgLy8gQSBibGFjayByZWN0YW5nbGUgb24gYSBncmV5IHJlY3RhbmdsZSBhcyBtYXNrLlxuICAgICAgICAgIC8vIEEgYmxhY2sgcmVjdGFuZ2xlIGFzIG1hc2tlZCwgY2F1c2luZyBvbmx5XG4gICAgICAgICAgLy8gdGhlIGJvcmRlcnMgdG8gc2hvdyB3aXRoIHRyYW5zcGFyZW5jeS5cbiAgICAgICAgICAvL1xuICAgICAgICAgIC8vIFN0cm9rZSBpcyBub3QgdXNlZCBhcyBpdCBkb2Vzbid0IHNjYWxlXG4gICAgICAgICAgLy8gcHJvcG9ydGlvbmFsbHkgd2l0aCBwaXhlbHMgKEVnOiBpbiBGaWdtYSkuXG4gICAgICAgICAgbWFzazogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICB4OiAocGFkZGluZyAtIDEpICogb3V0cHV0UGl4ZWxTaXplLFxuICAgICAgICAgICAgICB5OiAocGFkZGluZyAtIDEpICogb3V0cHV0UGl4ZWxTaXplLFxuICAgICAgICAgICAgICB3OiAod2lkdGggKyAyKSAqIG91dHB1dFBpeGVsU2l6ZSxcbiAgICAgICAgICAgICAgaDogKGhlaWdodCArIDIpICogb3V0cHV0UGl4ZWxTaXplLFxuICAgICAgICAgICAgICBmaWxsOiBcIiMzRjNGM0ZcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHg6IHBhZGRpbmcgKiBvdXRwdXRQaXhlbFNpemUsXG4gICAgICAgICAgICAgIHk6IHBhZGRpbmcgKiBvdXRwdXRQaXhlbFNpemUsXG4gICAgICAgICAgICAgIHc6IHdpZHRoICogb3V0cHV0UGl4ZWxTaXplLFxuICAgICAgICAgICAgICBoOiB3aWR0aCAqIG91dHB1dFBpeGVsU2l6ZSxcbiAgICAgICAgICAgICAgZmlsbDogXCIjMDAwMDAwXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIF0sXG4gICAgICAgICAgbWFza2VkOiB7XG4gICAgICAgICAgICB4OiAocGFkZGluZyAtIDEpICogb3V0cHV0UGl4ZWxTaXplLFxuICAgICAgICAgICAgeTogKHBhZGRpbmcgLSAxKSAqIG91dHB1dFBpeGVsU2l6ZSxcbiAgICAgICAgICAgIHc6ICh3aWR0aCArIDIpICogb3V0cHV0UGl4ZWxTaXplLFxuICAgICAgICAgICAgaDogKGhlaWdodCArIDIpICogb3V0cHV0UGl4ZWxTaXplLFxuICAgICAgICAgICAgZmlsbDogXCIjMDAwMDAwXCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICAgIH1cblxuICAgICAgLy8gRm9yIGVhY2ggcm93XG4gICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IGhlaWdodDsgKyt5KSB7XG4gICAgICAgIC8vIEZvciBlYWNoIGNvbHVtblxuICAgICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHdpZHRoOyArK3gpIHtcbiAgICAgICAgICBjb25zdCBzeCA9IHNwcml0ZVdpZHRoICogY29sICsgKHggKyBwYWRkaW5nKSAqIHBpeGVsc1BlclVuaXQ7XG4gICAgICAgICAgY29uc3Qgc3kgPSBzcHJpdGVIZWlnaHQgKiByb3cgKyAoeSArIHBhZGRpbmcpICogcGl4ZWxzUGVyVW5pdDtcbiAgICAgICAgICBjb25zdCBwaXhlbCA9IGN0eC5nZXRJbWFnZURhdGEoc3gsIHN5LCAxLCAxKS5kYXRhO1xuICAgICAgICAgIGNvbnN0IHBpeGVsT3BhY2l0eSA9IHBpeGVsWzNdIC8gMjU1O1xuICAgICAgICAgIGlmIChpc1NhbWVSZ2IocGl4ZWwsIGJnUGl4ZWwpIHx8IHBpeGVsT3BhY2l0eSA9PT0gMCkge1xuICAgICAgICAgICAgLy8gU2tpcCB0cmFuc3BhcmVudCBwaXhlbHMuXG4gICAgICAgICAgICAvLyBUcmVhdCBiZyBjb2xvciBwaXhlbHMgYXMgdHJhbnNwYXJlbnQuXG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3QgcGl4ZWxDb2xvciA9IHJnYlRvSGV4KHBpeGVsWzBdLCBwaXhlbFsxXSwgcGl4ZWxbMl0pO1xuICAgICAgICAgIHN2Z0RhdGEucGl4ZWxzLnB1c2goe1xuICAgICAgICAgICAgZmlsbDogcGl4ZWxDb2xvcixcbiAgICAgICAgICAgIG9wYWNpdHk6IHBpeGVsT3BhY2l0eSxcbiAgICAgICAgICAgIHg6IHggKiBvdXRwdXRQaXhlbFNpemUsXG4gICAgICAgICAgICB5OiB5ICogb3V0cHV0UGl4ZWxTaXplLFxuICAgICAgICAgICAgdzogb3V0cHV0UGl4ZWxTaXplLFxuICAgICAgICAgICAgaDogb3V0cHV0UGl4ZWxTaXplLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHBvc3RNZXNzYWdlKHtcbiAgICAgICAgdHlwZTogXCJwcm9ncmVzc1wiLFxuICAgICAgICBkZXRhaWxzOiBgJHtzdmdDb3VudH0vJHtudW1TcHJpdGVzfWAsXG4gICAgICAgIHN2Z0RhdGEsXG4gICAgICB9KTtcblxuICAgICAgc3ZnQ291bnQgKz0gMTtcbiAgICB9XG4gIH1cbn1cblxuLy8gQ29tcGFyZSB0d28gYml0bWFwIHBpeGVsIGRhdGFcbmZ1bmN0aW9uIGlzU2FtZVJnYihwMSwgcDIpIHtcbiAgaWYgKHAxID09IG51bGwgfHwgcDIgPT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gcDFbMF0gPT09IHAyWzBdICYmIHAxWzFdID09PSBwMlsxXSAmJiBwMVsyXSA9PT0gcDJbMl07XG59XG4iXSwibmFtZXMiOlsiY29tcG9uZW50VG9IZXgiLCJjIiwidG9TdHJpbmciLCJwYWRTdGFydCIsInJnYlRvSGV4IiwiciIsImciLCJiIiwib25tZXNzYWdlIiwiYXN5bmMiLCJlIiwiZGF0YSIsImNhbnZhcyIsInBpeGVsSW1nIiwic3ByaXRlQ29uZmlnIiwid2lkdGgiLCJoZWlnaHQiLCJuUm93cyIsIm5Db2xzIiwicGFkZGluZyIsIm91dHB1dFBpeGVsU2l6ZSIsInNwcml0ZU5hbWVzIiwiY3R4IiwiZ2V0Q29udGV4dCIsIndpbGxSZWFkRnJlcXVlbnRseSIsImFudGlhbGlhcyIsImRyYXdJbWFnZSIsInNwcml0ZVNoZWV0V2lkdGgiLCJzcHJpdGVTaGVldEhlaWdodCIsInNwcml0ZVdpZHRoIiwic3ByaXRlSGVpZ2h0IiwicGl4ZWxzUGVyVW5pdCIsIm51bVNwcml0ZXMiLCJwb3N0TWVzc2FnZSIsInR5cGUiLCJtZXNzYWdlIiwic3ZnQ291bnQiLCJyb3ciLCJjb2wiLCJmaWxlbmFtZSIsImxlbmd0aCIsInN2Z0RhdGEiLCJ3IiwiaCIsInBpeGVscyIsImJnUGl4ZWwiLCJnZXRJbWFnZURhdGEiLCJiZ0NvbG9yIiwiYmFja2dyb3VuZCIsImZpbGwiLCJ4IiwieSIsImd1aWRlIiwibWFzayIsIm1hc2tlZCIsInN4Iiwic3kiLCJwaXhlbCIsInBpeGVsT3BhY2l0eSIsInAyIiwicDEiLCJwaXhlbENvbG9yIiwicHVzaCIsIm9wYWNpdHkiLCJkZXRhaWxzIiwiY29udmVydFRvU3ZnRGF0YSIsImVyciIsImVycm9yIl0sInNvdXJjZVJvb3QiOiIifQ==