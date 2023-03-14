November 07, 2022

README: RxNorm 11/07/2022 Full Update Release
===================================================

-----------------------------------------------------------------
This Full release contains data that is consistent with the
2020AA version of the UMLS.
-----------------------------------------------------------------
This release contains updates to the following sources:

ATC -  ATC_2022 (Anatomical Therapeutic Chemical Classification System)
GS -  10/07/2022 (Gold Standard Alchemy)
CVX -  10/24/2022 (Vaccines Administered,  2022_10_24)
MMSL -  10/01/2022 (Multum MediSource Lexicon)
MMX -  10/03/2022 (Micromedex DRUGDEX)
MTHSPL -  10/27/2022 (FDA Structured Product Labels)
NDDF -  10/05/2022 (First Databank FDB MedKnowledge (formerly NDDF Plus))
#NDFRT -  (National Drug File - Reference Terminology)
VANDF -  09/30/2022 (Veterans Health Administration National Drug File)
DRUGBANK -  10/05/2022 (DrugBank,  5.0_2022_10_05)
USP -  09/14/2022 (USP Compendial Nomenclature)

For full details, please refer to the RxNorm documentation at
https://www.nlm.nih.gov/research/umls/rxnorm/docs/index.html.

This release contains database control files and SQL
commands for use in the automation of the loading process of
these files into an Oracle RDBMS.In addition, scripts are now
provided for loading the RxNorm files into a MySQL database.

RxNorm release data files are available by download from
the NLM download server at:

        https://www.nlm.nih.gov/research/umls/rxnorm/docs/rxnormfiles.html

This link will take you to a page for downloading the latest files:
RxNorm_full_11072022.zip
Once downloaded, it must be unzipped in order to access the files.

HARDWARE AND SOFTWARE RECOMMENDATIONS
-------------------------------------
- Supported operating systems:
        Windows: 7
        Linux
        Solaris: Solaris 10

- Hardware Requirements

  - A MINIMUM 1.99 GB of free hard disk space (To accomodate ZIP files and
        unzipped contents).

CONTENTS OF THE ZIP FILE
-------------------------

The ZIP formatted file is 253,939,016 bytes and contains the
following 44 files and 9 directories:

Readme_Full_11072022.txt            5477                 bytes

rrf directory:

RXNATOMARCHIVE.RRF                  78,202,446           bytes
RXNCONSO.RRF                        125,360,655          bytes
RXNCUICHANGES.RRF                   29,751               bytes
RXNCUI.RRF                          1,722,792            bytes
RXNDOC.RRF                          218,706              bytes
RXNREL.RRF                          524,431,073          bytes
RXNSAB.RRF                          10,730               bytes
RXNSAT.RRF                          530,881,650          bytes
RXNSTY.RRF                          18,499,632           bytes


scripts directory:

        oracle sub-directory:

populate_oracle_rxn_db.bat          1,164                bytes
RXNATOMARCHIVE.ctl                  564                  bytes
RXNCONSO.ctl                        512                  bytes
RXNCUICHANGES.ctl                   346                  bytes
RXNCUI.ctl                          296                  bytes
RXNDOC.ctl                          248                  bytes
rxn_index.sql                       660                  bytes
RxNormDDL.sql                       3,291                bytes
RXNREL.ctl                          471                  bytes
RXNSAB.ctl                          674                  bytes
RXNSAT.ctl                          378                  bytes
RXNSTY.ctl                          267                  bytes

         mysql sub-directory:

Indexes_mysql_rxn.sql               662                  bytes
Load_scripts_mysql_rxn_unix.sql     3,961                bytes
Load_scripts_mysql_rxn_win.sql      3,959                bytes
Populate_mysql_rxn.bat              775                  bytes
populate_mysql_rxn.sh               1,609                bytes
Table_scripts_mysql_rxn.sql         4,205                bytes

prescribe directory:

Readme_Full_Prescribe_11072022.txt  3075                 bytes

      rrf sub-directory:

RXNCONSO.RRF                        29,312,771           bytes
RXNREL.RRF                          196,094,334          bytes
RXNSAT.RRF                          267,880,735          bytes


      scripts sub-directory:

         oracle sub-directory:

populate_oracle_rxn_db.bat          699                  bytes
RXNCONSO.ctl                        512                  bytes
rxn_index.sql                       460                  bytes
RxNormDDL.sql                       1,373                bytes
RXNREL.ctl                          471                  bytes
RXNSAT.ctl                          378                  bytes

         mysql sub-directory:

Indexes_mysql_rxn.sql               463                  bytes
Load_scripts_mysql_rxn_unix.sql     1,469                bytes
Load_scripts_mysql_rxn_win.sql      1,468                bytes
Populate_mysql_rxn.bat              777                  bytes
populate_mysql_rxn.sh               1,609                bytes
Table_scripts_mysql_rxn.sql         1,749                bytes
Additional NOTES:

-----------------

- Most RxNorm users will need applications and data management
  systems such as an RDBMS for storage and retrieval.

- The RxNorm release files contain UTF-8 Unicode encoded data.

- Refer to the RxNorm release documentation at
  https://www.nlm.nih.gov/research/umls/rxnorm/docs/index.html
